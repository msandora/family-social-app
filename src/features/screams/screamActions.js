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
  UNLIKE_SCREAM,
  GET_LIKES,
  GET_IMG_URL,
} from './screamConstants';
import firebase from '../../app/config/firebase';
import { dataFromSnapshot } from '../../app/firestore/firestoreService';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../../app/async/asyncReducer';
import {
  fetchScreamsFromFirestore,
  likeScreamService,
  unLikeScreamService,
  fetchLikes,
} from '../../app/firestore/firestoreServices/firestoreScreamsHandler';

export function listenToScreamPhotos(photos) {
  return {
    type: LISTEN_TO_SCREAM_PHOTOS,
    payload: photos,
  };
}

export function fetchScreams(limit, lastDocSnapshot, firstVisible) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchScreamsFromFirestore(
        limit,
        lastDocSnapshot,
        firstVisible
      ).get();
      // const firstVisible = snapshot.docs[0];
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreScreams = snapshot.docs.length >= limit;
      const screams = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      console.log({ screams });
      dispatch({
        type: FETCH_SCREAMS,
        payload: { screams, moreScreams, lastVisible, firstVisible },
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

export const likeScream = (scream) => async (dispatch) => {
  //  let screamFromLike = await getScreamFromLikes(scream)
  //  dispatch({ type: GET_LIKES, payload: screamFromLike });
  // const screamData = await likeScreamService(scream);
  //  console.log("screamDataFromAction",screamData)
  scream.likeCount++;
  dispatch({ type: LIKE_SCREAM, payload: scream });
  return {
    type: LIKE_SCREAM,
    payload: scream,
  };
};

export const UnLikeScream = (scream) => async (dispatch) => {
  // let screamFromLike = await getScreamFromLikes(scream)
  //  dispatch({ type: GET_LIKES, payload: screamFromLike });
  // const screamData = await unLikeScreamService(scream);
  scream.likeCount--;
  dispatch({ type: UNLIKE_SCREAM, payload: scream });
  return {
    type: UNLIKE_SCREAM,
    payload: scream,
  };
};

export const getLikes = () => async (dispatch) => {
  try {
    let likesData = [];
    const snapshot = await fetchLikes().get();
    snapshot.docs.map((doc) => likesData.push(doc.data()));
    // console.log({ snapshot });
    // console.log({ likesData });
    dispatch({ type: GET_LIKES, payload: likesData });
    return {
      type: GET_LIKES,
      payload: likesData,
    };
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError(error));
  }
};

// const getScreamFromLikes = async (scream) => {
//   const user = firebase.auth().currentUser;
//   let likesData = [];
//   const snapshot = await fetchLikes().get();
//   snapshot.docs.map((doc) => likesData.push(doc.data()));
//   return likesData.map((like) => {
//     if (like.screamId === scream.id) {
//       return { screamId: '', userHandle: '' };
//     } else {
//       return { screamId: scream.id, userHandle: user.uid };
//     }
//   });
// };

export function getImgUrl(imgUrl) {
  return {
    type: GET_IMG_URL,
    payload: imgUrl,
  };
}
