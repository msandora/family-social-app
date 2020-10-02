import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import testReducer from '../../features/sandbox/testReducer';
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import profileReducer from '../../features/profiles/profileReducer';
import familyReducer from '../../features/family/familyReducer';
import screamReducer from '../../features/screams/screamReducer';
import recipeReducer from '../../features/recipes/recipeReducer';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    test: testReducer,
    event: eventReducer,
    scream: screamReducer,
    recipe: recipeReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer,
    family: familyReducer,
  });

export default rootReducer;
