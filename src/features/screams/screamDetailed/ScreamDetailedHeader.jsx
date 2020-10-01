import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
import { useState } from 'react';
import UnauthModal from '../../auth/UnauthModal';

const screamImageStyle = {
  filter: 'brightness(30%)',
};

const screamImageTextStyle = {
  position: 'absolute',
  bottom: '1%',
  left: '1%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function ScreamDetailedHeader({ scream, isHost, isGoing }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached='top' style={{ padding: '0' }}>
          <Image
            src={`/assets/categoryImages/${scream.category}.jpg`}
            fluid
            style={screamImageStyle}
          />

          <Segment basic style={screamImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={scream.title}
                    style={{ color: 'white' }}
                  />
                  {/* <p>{format(scream.date, 'MMMM d, yyyy h:mm a')}</p> */}
                  <p>
                    Hosted by{' '}
                    <strong>
                      <Link to={`/profile/${scream.hostUid}`}>
                        {scream.hostedBy}
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
              to={`/manageScream/${scream.id}`}
              size='small'
              color='orange'
              floated='right'
            >
              Manage Scream
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
