import React from 'react';
import { Segment } from 'semantic-ui-react';
import MyButton from '../../../app/common/MyButton';
import { deleteRecipeInFirestore } from '../../../app/firestore/firestoreServices/firestoreRecipesHandler';

export default function RecipeDetailedInfo({ recipe, isHost }) {
  return (
    <>
      <Segment>
        <p>Category: {recipe.category}</p>
        <p>Title: {recipe.title}</p>
        <p>description: {recipe.description}</p>
      </Segment>
      <Segment attached='bottom' clearing>
        {isHost && (
          <>
            <MyButton
              onClick={() => deleteRecipeInFirestore(recipe.id)}
              // content='Delete'
              tip='Delete Recipe'
              color='red'
              icon='trash'
              linkRef={null}
            />
            <MyButton
              // onClick={() => console.log('fix this', recipe.id)}
              tip='Manage Recipe'
              color='orange'
              icon='edit'
              linkRef={`/manageRecipe/${recipe?.id}`}
            />
          </>
        )}
      </Segment>
    </>
  );
}
