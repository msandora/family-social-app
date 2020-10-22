import {
  CREATE_SCREAM,
  UPDATE_SCREAM,
  DELETE_SCREAM,
  FETCH_SCREAMS,
  LISTEN_TO_SCREAM_CHAT,
  LISTEN_TO_SCREAM_PHOTOS,
  LISTEN_TO_SELECTED_SCREAM,
  CLEAR_SCREAMS,
  CLEAR_SELECTED_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from './screamConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../../app/async/asyncReducer';
import { dataFromSnapshot } from '../../app/firestore/firestoreService';
import { fetchScreamsFromFirestore, unLikeScreamService } from '../../app/firestore/firestoreServices/firestoreScreamsHandler';
import { likeScreamService, UnLikeScreamService } from '../../app/firestore/firestoreServices/firestoreScreamsHandler';

export function listenToScreamPhotos(photos) {
  return {
    type: LISTEN_TO_SCREAM_PHOTOS,
    payload: photos,
  };
}

export function fetchScreams(limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchScreamsFromFirestore(
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreScreams = snapshot.docs.length >= limit;
      const screams = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_SCREAMS,
        payload: { screams, moreScreams, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToSelectedScream(scream) {
  return {
    type: LISTEN_TO_SELECTED_SCREAM,
    payload: scream,
  };
}

export function clearSelectedScream() {
  return {
    type: CLEAR_SELECTED_SCREAM,
  };
}

export function createScream(scream) {
  return {
    type: CREATE_SCREAM,
    payload: scream,
  };
}

export function updateScream(scream) {
  return {
    type: UPDATE_SCREAM,
    payload: scream,
  };
}

export function deleteScream(screamId) {
  return {
    type: DELETE_SCREAM,
    payload: screamId,
  };
}

export function listenToScreamChat(comments) {
  return {
    type: LISTEN_TO_SCREAM_CHAT,
    payload: comments,
  };
}

export function clearScreams() {
  return {
    type: CLEAR_SCREAMS,
  };
}
export const likeScream = (scream)  => async (dispatch)  => {
 const screamData = await likeScreamService(scream)
//  console.log("screamDataFromAction",screamData)
scream.likeCount++
 dispatch({ type: LIKE_SCREAM, payload: scream });
  return {
    type: LIKE_SCREAM,
    payload:scream ,
  };
}
export const UnLikeScream =  (scream) => async (dispatch)  =>  {
 const screamData = await unLikeScreamService(scream)
scream.likeCount--
  dispatch({ type: UNLIKE_SCREAM, payload: scream });
  return {
    type: UNLIKE_SCREAM,
    payload:scream ,
  }; 
}