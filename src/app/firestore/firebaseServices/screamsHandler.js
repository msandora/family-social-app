import firebase from '../../config/firebase';

export function addScreamChatComment(screamId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return firebase.database().ref(`scream_chat/${screamId}`).push(newComment);
}

export function getScreamChatRef(screamId) {
  return firebase.database().ref(`scream_chat/${screamId}`).orderByKey();
}
