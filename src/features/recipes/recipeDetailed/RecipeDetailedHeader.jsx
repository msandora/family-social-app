import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
import { useState } from 'react';
import UnauthModal from '../../auth/UnauthModal';

const recipeImageStyle = {
  filter: 'brightness(30%)',
};

const recipeImageTextStyle = {
  position: 'absolute',
  bottom: '1%',
  left: '1%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function RecipeDetailedHeader({ recipe, isHost, isGoing }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached='top' style={{ padding: '0' }}>
          <Image
            src={`/assets/categoryImages/${recipe.category}.jpg`}
            fluid
            style={recipeImageStyle}
          />

          <Segment basic style={recipeImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={recipe.title}
                    style={{ color: 'white' }}
                  />
                  {/* <p>{format(recipe.date, 'MMMM d, yyyy h:mm a')}</p> */}
                  <p>
                    Hosted by{' '}
                    <strong>
                      <Link to={`/profile/${recipe.hostUid}`}>
                        {recipe.hostedBy}
                      </Link>{' '}
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached='bottom' clearing>
          {isHost && (
            <Button
              as={Link}
              to={`/manageRecipe/${recipe.id}`}
              size='small'
              color='orange'
              floated='right'
            >
              Manage Recipe
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
