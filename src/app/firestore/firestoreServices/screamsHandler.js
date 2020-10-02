import firebase from '../../config/firebase';

const db = firebase.firestore();

export function fetchScreamsFromFirestore(
  filter,
  startDate,
  limit,
  lastDocSnapshot = null
) {
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
  const user = firebase.auth().currentUser;
  return db.collection('screams').add({
    ...scream,
    createdAt: new Date(),
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
  });
}

export function updateScreamInFirestore(scream) {
  return db.collection('screams').doc(scream.id).update(scream);
}

export function deleteScreamInFirestore(screamId) {
  return db.collection('screams').doc(screamId).delete();
}
