import { FETCH_FAMILY, RETAIN_FAMILY_STATE } from './familyConstants';

const initialState = {
  family: [],
  retainState: false,
};

export default function familyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_FAMILY:
      return {
        ...state,
        family: [...state.family],
      };
    case RETAIN_FAMILY_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
