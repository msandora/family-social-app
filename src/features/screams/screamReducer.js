import {
  CREATE_SCREAM,
  UPDATE_SCREAM,
  DELETE_SCREAM,
  FETCH_SCREAMS,
  LISTEN_TO_SCREAM_CHAT,
  CLEAR_COMMENTS,
  LISTEN_TO_SELECTED_SCREAM,
  CLEAR_SCREAMS,
  SET_FILTER,
  SET_START_DATE,
  RETAIN_STATE,
  CLEAR_SELECTED_SCREAM,
} from './screamConstants';

const initialState = {
  screams: [],
  comments: [],
  moreScreams: true,
  selectedScream: null,
  lastVisible: null,
  filter: 'all',
  startDate: new Date(),
  retainState: false,
};

export default function screamReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_SCREAM:
      return {
        ...state,
        screams: [...state.screams, payload],
      };
    case UPDATE_SCREAM:
      return {
        ...state,
        screams: [
          ...state.screams.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: [...state.screams.filter((evt) => evt.id !== payload)],
      };
    case FETCH_SCREAMS:
      return {
        ...state,
        screams: [...state.screams, ...payload.screams],
        moreScreams: payload.moreScreams,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_SCREAM_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case LISTEN_TO_SELECTED_SCREAM:
      return {
        ...state,
        selectedScream: payload,
      };
    case CLEAR_SELECTED_SCREAM:
      return {
        ...state,
        selectedScream: null,
      };
    case CLEAR_SCREAMS:
      return {
        ...state,
        screams: [],
        moreScreams: true,
        lastVisible: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreScreams: true,
        filter: payload,
      };
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreScreams: true,
        startDate: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
