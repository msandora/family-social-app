import firebase from '../../config/firebase';

const db = firebase.firestore();

export function getFamilyFromFirestore(observer) {
  return db.collection('family').onSnapshot(observer);
}

export function listenToPersonFromFirestore(personId) {
  return db.collection('family').doc(personId);
}

export function updatePersonInFirestore(person) {
  return db.collection('family').doc(person.id).update(person);
}

export function addPersonToFirestore(person) {
  // const user = firebase.auth().currentUser;
  return db.collection('family').add({
    ...person,
    // createdAt: new Date(),
    // hostUid: user.uid,
    // hostedBy: user.displayName,
    // hostPhotoURL: user.photoURL || null,
    // attendees: firebase.firestore.FieldValue.arrayUnion({
    //   id: user.uid,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL || null,
    // }),
    // attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}
