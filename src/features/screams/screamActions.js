import {
  CREATE_SCREAM,
  UPDATE_SCREAM,
  DELETE_SCREAM,
  FETCH_SCREAMS,
  LISTEN_TO_SCREAM_CHAT,
  LISTEN_TO_SELECTED_SCREAM,
  CLEAR_SCREAMS,
  SET_FILTER,
  SET_START_DATE,
  CLEAR_SELECTED_SCREAM,
} from './screamConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../../app/async/asyncReducer';
import {
  fetchScreamsFromFirestore,
  dataFromSnapshot,
} from '../../app/firestore/firestoreService';

export function listenToScreams(screams) {
  return {
    type: FETCH_SCREAMS,
    payload: { screams },
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

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearScreams());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function setStartDate(date) {
  return function (dispatch) {
    dispatch(clearScreams());
    dispatch({ type: SET_START_DATE, payload: date });
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
