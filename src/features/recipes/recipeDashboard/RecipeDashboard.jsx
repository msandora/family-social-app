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
  const [hasMore, setHasMore] = useState(true)

  

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
  
  // graphql query for fetching recipes from mongodb 
  const { fetchMore,loading, error, data:{ getRecipes: recipes }} = useQuery(FETCH_RECIPES_QUERY, {
    variables: { category: filter ? filter : "all",skip:0 },
  });
  console.log({recipes})
  // console.log(fetchMore)
  //end graphql 
  
  const getMore = () => {
    // const { endCursor } = data.viewer.repositories.pageInfo;
    fetchMore({
      variables: {category: filter,skip:2 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log({prevResult})
        console.log({fetchMoreResult})
        let length = fetchMoreResult.getRecipes.length; 
        console.log( "sliced prevResult",prevResult.getRecipes.slice(length-2 , length))
        // console.log( "slciced prevResult",prevResult.getRecipes.slice(0 , 2))
        
        // if( prevResult.getRecipes.slice(length-2 , length) == fetchMoreResult.getRecipes ){
        //   console.log("new == old")
        //    setHasMore(false) 
        //   return prevResult;
        // } else {
        //   console.log("new !== old")
        //    prevResult.getRecipes = [ ...prevResult.getRecipes,
        //     ...fetchMoreResult.getRecipes ];
        //     setHasMore(true) 
        //     return prevResult;
        // }
        prevResult.getRecipes = [ ...prevResult.getRecipes,
              ...fetchMoreResult.getRecipes ];
              return prevResult
      }
    });
  }
  return (
    <>
      <CreateRecipe />
      <Grid>
        <Grid.Column width={10}>
          {loading && (
            <>
              <RecipeListItemPlaceholder />
              <RecipeListItemPlaceholder />
            </>
          )}
          {!loading && (
            <RecipeList
              // recipesToLoad={recipes}
              recipesToLoad={ recipes}
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
