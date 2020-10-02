import {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  FETCH_RECIPES,
  LISTEN_TO_RECIPE_CHAT,
  CLEAR_COMMENTS,
  LISTEN_TO_SELECTED_RECIPE,
  CLEAR_RECIPES,
  SET_RECIPES_FILTER,
  SET_START_DATE,
  RETAIN_RECIPE_STATE,
  CLEAR_SELECTED_RECIPE,
} from './recipeConstants';

const initialState = {
  recipes: [],
  comments: [],
  moreRecipes: true,
  selectedRecipe: null,
  lastVisible: null,
  filter: 'all',
  startDate: new Date(),
  retainState: false,
};

export default function recipeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, payload],
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes.filter((evt) => evt.id !== payload)],
      };
    case FETCH_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, ...payload.recipes],
        moreRecipes: payload.moreRecipes,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_RECIPE_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    case LISTEN_TO_SELECTED_RECIPE:
      return {
        ...state,
        selectedRecipe: payload,
      };
    case CLEAR_SELECTED_RECIPE:
      return {
        ...state,
        selectedRecipe: null,
      };
    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: [],
        moreRecipes: true,
        lastVisible: null,
      };
    case SET_RECIPES_FILTER:
      return {
        ...state,
        retainState: false,
        moreRecipes: true,
        filter: payload,
      };
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreRecipes: true,
        startDate: payload,
      };
    case RETAIN_RECIPE_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
