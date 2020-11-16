import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';
import RecipeDetailedHeader from './RecipeDetailedHeader';
import RecipeDetailedInfo from './RecipeDetailedInfo';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToRecipeFromFirestore } from '../../../app/firestore/firestoreServices/firestoreRecipesHandler';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { listenToSelectedRecipe } from '../recipeActions';
import { useMediaQuery } from 'react-responsive';

export default function RecipeDetailedPage({ match }) {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const recipe = useSelector((state) => state.recipe.selectedRecipe);
  const { loading, error } = useSelector((state) => state.async);
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
      <Grid.Column width={isPortrait ? 16 : 10}>
        <Segment.Group>
          <RecipeDetailedHeader recipe={recipe} />
          <RecipeDetailedInfo recipe={recipe} isHost={isHost} />
        </Segment.Group>
      </Grid.Column>
      {isPortrait ? null : <Grid.Column width={6}></Grid.Column>}
    </Grid>
  );
}
