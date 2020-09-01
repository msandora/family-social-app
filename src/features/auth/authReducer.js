import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
// import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  authenticated: true,
  // currentUser: null,
  currentUser: {
    email: 'bob@test.com',
    photoURL: '/assets/user.png',
  },
  prevLocation: null,
  currentLocation: null,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (
    type // switch on the type
  ) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: '/assets/user.png',
          // uid: payload.uid,
          // displayName: payload.displayName,
          // providerId: payload.providerData[0].providerId,
        },
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    // case LOCATION_CHANGE:
    //   return {
    //     ...state,
    //     prevLocation: state.currentLocation,
    //     currentLocation: payload.location,
    //   };
    default:
      return state;
  }
}
