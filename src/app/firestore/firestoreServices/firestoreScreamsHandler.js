import firebase from '../../config/firebase';

const db = firebase.firestore();

export function fetchScreamsFromFirestore(limit, lastDocSnapshot = null) {
  // const user = firebase.auth().currentUser;
  let screamsRef = db
    .collection('screams')
    .orderBy('createdAt')
    .startAfter(lastDocSnapshot)
    .limit(limit);
  return screamsRef;
}

export function listenToScreamFromFirestore(screamId) {
  return db.collection('screams').doc(screamId);
}

export function addScreamToFirestore(scream) {
  console.log(scream);
  const user = firebase.auth().currentUser;
  return db.collection('screams').add({
    ...scream,
    createdAt: new Date(),
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    photos: [],
  });
}

export function updateScreamInFirestore(scream) {
  // console.log(scream);
  return db.collection('screams').doc(scream.id).update(scream);
}

export function deleteScreamInFirestore(screamId) {
  return db.collection('screams').doc(screamId).delete();
}

export async function updateScreamPhoto(downloadURL, filename, screamId) {
  try {
    return await db
      .collection('screams')
      .doc(screamId)
      .collection('photos')
      .add({
        name: filename,
        url: downloadURL,
      });
  } catch (error) {
    throw error;
  }
}

export function getScreamPhotos(screamId) {
  return db.collection('screams').doc(screamId).collection('photos');
}
