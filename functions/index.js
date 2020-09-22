const functions = require('firebase-functions');
const admin = require('firebase-admin'); //access database
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    console.log({ following });
    try {
      const userDoc = await db
        .collection('users')
        .doc(context.params.userUid)
        .get();
      const batch = db.batch();
      batch.set(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );
      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    batch.delete(
      db
        .collection('following')
        .doc(context.params.profileId)
        .collection('userFollowers')
        .doc(context.params.userUid)
    );
    batch.update(db.collection('users').doc(context.params.profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });
    try {
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.eventUpdated = functions.firestore
  .document('events/{eventId}') // get eventId through context
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data(); //Need to grab the attendee that joined
    // Attendee Joined?
    if (before.attendees.length < after.attendees.length) {
      let attendeeJoined = after.attendees.filter(
        // Filter everyone but the attendee that joined
        (item1) => !before.attendees.some((item2) => item2.id === item1.id)
      )[0]; //compare difference
      console.log({ attendeeJoined });
      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeJoined.id)
          .collection('userFollowers')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeJoined,
                'joined-event',
                context.params.eventId,
                before
              )
            );
        });
      } catch (error) {
        return console.log(error);
      }
    }
    // Attendee Left?
    if (before.attendees.length > after.attendees.length) {
      let attendeeLeft = before.attendees.filter(
        (item1) => !after.attendees.some((item2) => item2.id === item1.id)
      )[0];
      console.log({ attendeeLeft });
      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeLeft.id)
          .collection('userFollowers')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeLeft,
                'left-event',
                context.params.eventId,
                before
              )
            );
        });
      } catch (error) {
        return console.log(error);
      }
    }
    return console.log('finished');
  });

function newPost(user, code, eventId, event) {
  return {
    photoURL: user.photoURL,
    date: admin.database.ServerValue.TIMESTAMP,
    code,
    displayName: user.displayName,
    eventId,
    userUid: user.id,
    title: event.title,
  };
}
