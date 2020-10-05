import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import ScreamDetailedCarousel from './ScreamDetailedCarousel';

export default function ScreamDetailedInfo({ scream, isHost }) {
  return (
    <>
      <Segment style={{ padding: 0 }}>
        <ScreamDetailedCarousel scream={scream} />
      </Segment>
      <Segment>
        <p>{scream.description}</p>
      </Segment>
      <Segment attached='bottom' clearing>
        {isHost && (
          <Button
            as={Link}
            to={`/manageScream/${scream.id}`}
            color='orange'
            floated='right'
          >
            Manage Post
          </Button>
        )}
      </Segment>
    </>
  );
}
