import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

export default function RecipeDetailedInfo({ recipe, isHost }) {
  return (
    <>
      <Segment>
        <p>{recipe.description}</p>
      </Segment>
      <Segment attached='bottom' clearing>
        {isHost && (
          <Button
            as={Link}
            to={`/manageRecipe/${recipe.id}`}
            color='orange'
            floated='right'
          >
            Manage Recipe
          </Button>
        )}
      </Segment>
    </>
  );
}
