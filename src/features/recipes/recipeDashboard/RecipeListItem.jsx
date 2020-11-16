import React from 'react';
import { Segment, Image, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

export default function RecipeListItem({ recipe }) {
  return (
    <Segment.Group>
      <Segment>
        <Header as='h5'>
          <Image
            circular
            src={recipe.hostPhotoURL || '/assets/user.png'}
            as={Link}
            to={`/profile/${recipe.hostUid}`}
          />
          <Header.Content>
            {recipe.hostedBy}
            <Header.Subheader>
              {formatDistance(recipe.createdAt, new Date())} ago
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
      <Segment>
        <div>Category: {recipe.category}</div>
        <div>Prep Time: {recipe.prepTime}</div>
        <div>Ingredients: {recipe.ingredients}</div>
        <div>Instructions: {recipe.steps}</div>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/recipes/${recipe.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}
