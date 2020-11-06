import React, { useState, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import RecipeList from './RecipeList';
import { useSelector, useDispatch } from 'react-redux';
import RecipeListItemPlaceholder from './RecipeListItemPlaceholder';
import RecipeFilters from './RecipeFilters';
import { fetchRecipes,fetchFliteredRecipes } from '../recipeActions';
import { RETAIN_RECIPE_STATE } from '../recipeConstants';
import CreateRecipe from './CreateRecipe';

//graphql stuff
import {FETCH_RECIPES_QUERY} from '../../../utils/graqphql'
import { useQuery } from '@apollo/react-hooks';


export default function RecipeDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {
    // recipes,
    moreRecipes,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.recipe);
  // const { loading } = useSelector((state) => state.async);
  // const { authenticated } = useSelector((state) => state.auth);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [fetchMoreResultsState, setFetchMoreResultsState] = useState([])
  const [hasMore, setHasMore] = useState(true)

  // graphql query for fetching recipes from mongodb 
  const { fetchMore,loading, error, data:{ getRecipes: recipes }} = useQuery(FETCH_RECIPES_QUERY, {
    variables: { category: filter ? filter : "all",skip:0 },
  });
  console.log("recipes", recipes)
  // console.log(fetchMore)
  //end graphql 
  

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    // dispatch(fetchFliteredRecipes(filter, limit)).then(() => {
    dispatch(fetchRecipes(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_RECIPE_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextRecipes() {
    // dispatch(fetchRecipes(filter, startDate, limit, lastVisible));
    
  }
  const getMore = () => {
    // const { endCursor } = data.viewer.repositories.pageInfo;
    fetchMore({
      variables: {category: filter,skip:2 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log({prevResult})
        console.log({fetchMoreResult})
        let recipesMix ;
          if ( fetchMoreResult.getRecipes !==  prevResult.getRecipes) {
            console.log("nextResult !== moresult")
            recipesMix = [ ...prevResult.getRecipes,
              ...fetchMoreResult.getRecipes ];
              setFetchMoreResultsState(recipesMix)
              setHasMore(true)
          } else {
            console.log("nextResult == moresult")
            recipesMix =  fetchMoreResult.getRecipes;
            setFetchMoreResultsState(recipesMix)
            setHasMore(false);
          }
        return fetchMoreResultsState;
      }
    });
  }
console.log({fetchMoreResultsState})
  return (
    <>
      <CreateRecipe />
      <Grid>
        <Grid.Column width={10}>
          {loadingInitial && (
            <>
              <RecipeListItemPlaceholder />
              <RecipeListItemPlaceholder />
            </>
          )}
          {!loadingInitial && (
            <RecipeList
              // recipesToLoad={recipes}
              recipesToLoad={fetchMoreResultsState.length > 0 ? fetchMoreResultsState : recipes}
              getNextRecipes={getMore}
              loading={loading}
              hasMore={hasMore}
            />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <RecipeFilters loading={loading} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    </>
  );
}
