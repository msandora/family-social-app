import React from 'react';
import { Segment } from 'semantic-ui-react';
import MyButton from '../../../app/common/MyButton';
import { deleteRecipeInFirestore } from '../../../app/firestore/firestoreServices/firestoreRecipesHandler';

export default function RecipeDetailedInfo({ recipe, isHost }) {
  return (
    <>
      <Segment>
        <div>Category: {recipe.category}</div>
        <div>Prep Time: {recipe.prepTime}</div>
        <div>Ingredients: {recipe.ingredients}</div>
        <div>Instructions: {recipe.steps}</div>
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
              linkRef={`/recipes`}
            />
            <MyButton
              // onClick={() => console.log('fix this', recipe.id)}
              tip='Manage Recipe'
              color='orange'
              icon='edit'
              linkRef={`/manageRecipe/${recipe.id}`}
            />
          </>
        )}
      </Segment>
    </>
  );
}
