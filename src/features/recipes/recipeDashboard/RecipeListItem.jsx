import React from 'react';
import { Segment, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteRecipeInFirestore } from '../../../app/firestore/firestoreService';

export default function RecipeListItem({ recipe }) {
  // console.log(recipe);
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={recipe.hostPhotoURL || '/assets/user.png'}
            />
            <Item.Content>
              <Item.Header content={recipe.title} />
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profile/${recipe.hostUid}`}>{recipe.hostedBy}</Link>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <div style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</div>
      </Segment>
      <Segment clearing>
        <Button
          onClick={() => deleteRecipeInFirestore(recipe.id)}
          content='Delete'
          color='red'
          floated='right'
        />
        <Button
          as={Link}
          to={`/recipes/${recipe.id}`}
          content='View'
          color='teal'
          floated='right'
        />
      </Segment>
    </Segment.Group>
  );
}
