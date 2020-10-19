import {
  CLEAR_SELECTED_PERSON,
  CREATE_PERSON,
  DELETE_PERSON,
  FETCH_FAMILY,
  LISTEN_TO_SELECTED_PERSON,
  RETAIN_FAMILY_STATE,
  UPDATE_PERSON,
} from './familyConstants';

const initialState = {
  family: [],
  retainState: false,
  selectedPerson: null,
};

export default function familyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_PERSON:
      return {
        ...state,
        family: [...state.family, payload],
      };
    case UPDATE_PERSON:
      return {
        ...state,
        family: [
          ...state.family.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
    case DELETE_PERSON:
      return {
        ...state,
        family: [...state.family.filter((evt) => evt.id !== payload)],
      };
    case FETCH_FAMILY:
      return {
        ...state,
        family: payload,
      };
    case RETAIN_FAMILY_STATE:
      return {
        ...state,
        retainState: true,
      };
    case LISTEN_TO_SELECTED_PERSON:
      return {
        ...state,
        selectedPerson: payload,
      };
    case CLEAR_SELECTED_PERSON:
      return {
        ...state,
        selectedPerson: null,
      };
    default:
      return state;
  }
}
