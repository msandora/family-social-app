import {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  FETCH_RECIPES,
  LISTEN_TO_RECIPE_CHAT,
  LISTEN_TO_SELECTED_RECIPE,
  CLEAR_RECIPES,
  SET_FILTER,
  CLEAR_SELECTED_RECIPE,
} from './recipeConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../../app/async/asyncReducer';
import {
  fetchRecipesFromFirestore,
  dataFromSnapshot,
} from '../../app/firestore/firestoreService';

export function listenToRecipes(recipes) {
  return {
    type: FETCH_RECIPES,
    payload: { recipes },
  };
}

export function fetchRecipes(filter, startDate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchRecipesFromFirestore(
        filter,
        startDate,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreRecipes = snapshot.docs.length >= limit;
      const recipes = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_RECIPES,
        payload: { recipes, moreRecipes, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearRecipes());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function listenToSelectedRecipe(recipe) {
  return {
    type: LISTEN_TO_SELECTED_RECIPE,
    payload: recipe,
  };
}

export function clearSelectedRecipe() {
  return {
    type: CLEAR_SELECTED_RECIPE,
  };
}

export function createRecipe(recipe) {
  return {
    type: CREATE_RECIPE,
    payload: recipe,
  };
}

export function updateRecipe(recipe) {
  return {
    type: UPDATE_RECIPE,
    payload: recipe,
  };
}

export function deleteRecipe(recipeId) {
  return {
    type: DELETE_RECIPE,
    payload: recipeId,
  };
}

export function listenToRecipeChat(comments) {
  return {
    type: LISTEN_TO_RECIPE_CHAT,
    payload: comments,
  };
}

export function clearRecipes() {
  return {
    type: CLEAR_RECIPES,
  };
}
