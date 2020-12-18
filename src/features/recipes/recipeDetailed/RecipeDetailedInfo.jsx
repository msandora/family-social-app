import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Confirm } from 'semantic-ui-react';
// import MyButton from '../../../app/common/MyButton';
import { deleteRecipeInFirestore } from '../../../app/firestore/firestoreServices/firestoreRecipesHandler';

export default function RecipeDetailedInfo({ recipe, isHost }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

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
            <Button
              type='button'
              color='red'
              icon='trash'
              onClick={() => deleteRecipeInFirestore(recipe.id)}
              floated='right'
            />
            <Button
              type='button'
              color='teal'
              icon='edit'
              as={Link}
              to={`/manageRecipe/${recipe.id}`}
              floated='right'
            />

            {/* <MyButton
              onClick={() => setConfirmOpen(true)}
              tip='Delete Recipe'
              color='green'
              icon='trash'
              isLink={false}
            /> */}
          </>
        )}
      </Segment>
      <Confirm
        content={'Are you sure that you want to delete this recipe?'}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deleteRecipeInFirestore(recipe.id)}
      />
    </>
  );
}
