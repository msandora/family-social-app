import { FETCH_FAMILY, DELETE_FAMILY } from './familyConstants';

const initialState = {
  family: [],
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DELETE_FAMILY:
      return {
        ...state,
        family: [...state.family.filter((evt) => evt.id !== payload.id)],
      };
    case FETCH_FAMILY:
      return {
        ...state,
        family: payload,
      };
    default:
      return state;
  }
}
