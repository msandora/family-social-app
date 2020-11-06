
import firebase from '../../config/firebase';
const db = firebase.firestore();



export function fetchRecipesFromFirestore(
  filter,
  startDate,
  limit,
  lastDocSnapshot = null
) {
  // const user = firebase.auth().currentUser;
  let recipesRef = db
    .collection('recipes')
    .orderBy('category')
    .startAfter(lastDocSnapshot)
    .limit(limit);
    
    
    // return recipesRef
  switch (filter) {
    case 'breakfast':
    return recipesRef.where('category', '==', 'breakfast');
    case 'dinner':
      return recipesRef.where('category', '==', 'dinner');
    case 'desserts':
      return recipesRef.where('category', '==', 'desserts');
    case 'beverages':
      return recipesRef.where('category', '==', 'beverages');
    default:
      return recipesRef;
  }
}

export function listenToRecipeFromFirestore(recipeId) {
  return db.collection('recipes').doc(recipeId);
}

export function addRecipeToFirestore(recipe) {
  const user = firebase.auth().currentUser;
  return db.collection('recipes').add({
    ...recipe,
    createdAt: new Date(),
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
  });
}

export function updateRecipeInFirestore(recipe) {
  return db.collection('recipes').doc(recipe.id).update(recipe);
}

export function deleteRecipeInFirestore(recipeId) {
  return db.collection('recipes').doc(recipeId).delete();
}
export function fetchFilteredRecipesFromFirestore(
  filter,
  limit,
  lastDocSnapshot = null
) {
  // const user = firebase.auth().currentUser;
  let recipesRef = db
    .collection('recipes')
    .where('category', '==', "breakfast")
    // .orderBy('createdAt',"desc")
    .startAfter(lastDocSnapshot)
    .limit(limit);
    return recipesRef
}
