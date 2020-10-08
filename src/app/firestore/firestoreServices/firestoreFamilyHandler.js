import firebase from '../../config/firebase';

const db = firebase.firestore();

// export function getFamilyFromFirestore() {
//   let screamsRef = db.collection('family');

//   return screamsRef;
// }

export function getFamilyFromFirestore(observer) {
  return db.collection('family').onSnapshot(observer);
}

// var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

// export function fetchFamilyFromFirestore(limit, lastDocSnapshot = null) {
//   let familyRef = db
//     .collection('family')
//     .orderBy('createdAt')
//     .startAfter(lastDocSnapshot)
//     .limit(limit);
//   return familyRef;
// }
