import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';
import RecipeDetailedHeader from './RecipeDetailedHeader';
import RecipeDetailedInfo from './RecipeDetailedInfo';
// import RecipeDetailedSidebar from './RecipeDetailedSidebar';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToRecipeFromFirestore } from '../../../app/firestore/firestoreServices/firestoreRecipesHandler';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { listenToSelectedRecipe } from '../recipeActions';

//graphql stuff
import {FETCH_RECIPE_QUERY} from '../../../utils/graqphql'
import { useQuery } from '@apollo/react-hooks';


export default function RecipeDetailedPage({ match }) {
   // graphql query for fetching recipe from mongodb 
   const { loading, error, data:{ getRecipe: recipe }} = useQuery(FETCH_RECIPE_QUERY, {
    variables: { recipeId: match.params.id },
  });
  console.log({recipe})

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  // const recipe = useSelector((state) => state.recipe.selectedRecipe);
  // const { loading, error } = useSelector((state) => state.async);
  const isHost = recipe?.hostUid === currentUser?.uid;

  useFirestoreDoc({
    query: () => listenToRecipeFromFirestore(match.params.id),
    data: (recipe) => dispatch(listenToSelectedRecipe(recipe)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!recipe && !error))
    return <LoadingComponent content='Loading recipe...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment.Group>
          <RecipeDetailedHeader recipe={recipe} />
          <RecipeDetailedInfo recipe={recipe} isHost={isHost} />
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <RecipeDetailedSidebar recipeId={recipe.id} /> */}
      </Grid.Column>
    </Grid>
  );
}
