import React from 'react';
import { Grid } from 'semantic-ui-react';
import RecipeDetailedHeader from './RecipeDetailedHeader';
import RecipeDetailedInfo from './RecipeDetailedInfo';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToRecipeFromFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';
import { listenToSelectedRecipe } from '../recipeActions';

export default function RecipeDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const recipe = useSelector((state) => state.recipe.selectedRecipe);
  const { loading, error } = useSelector((state) => state.async);
  const isHost = recipe?.hostUid === currentUser?.uid;
  const isGoing = recipe?.attendees?.some((a) => a.id === currentUser?.uid);

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
        <RecipeDetailedHeader
          recipe={recipe}
          isGoing={isGoing}
          isHost={isHost}
        />
        <RecipeDetailedInfo recipe={recipe} />
      </Grid.Column>
      <Grid.Column width={6}>RecipeDetailedSidebar</Grid.Column>
    </Grid>
  );
}
