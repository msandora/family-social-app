import firebase from '../../config/firebase';

export function addRecipeChatComment(recipeId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return firebase.database().ref(`recipe_chat/${recipeId}`).push(newComment);
}

export function getRecipeChatRef(recipeId) {
  return firebase.database().ref(`recipe_chat/${recipeId}`).orderByKey();
}
