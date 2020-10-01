import React from 'react';
import { Grid } from 'semantic-ui-react';
import RecipeList from './RecipeList';
import RecipeSidebar from './RecipeSidebar';
import { useSelector, useDispatch } from 'react-redux';
import RecipeListItemPlaceholder from './RecipeListItemPlaceholder';
import { listenToRecipesFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToRecipes } from '../recipeActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

export default function RecipeDashboard() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipe);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => listenToRecipesFromFirestore(),
    data: (recipes) => dispatch(listenToRecipes(recipes)),
    deps: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <RecipeListItemPlaceholder />
            <RecipeListItemPlaceholder />
          </>
        )}
        <RecipeList recipes={recipes} />
      </Grid.Column>
      <Grid.Column width={6}>
        <RecipeSidebar />
        {/* {authenticated && <RecipeFeed />}
        <RecipeFilters loading={loading} /> */}
      </Grid.Column>
      {/* <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column> */}
    </Grid>
  );
}
