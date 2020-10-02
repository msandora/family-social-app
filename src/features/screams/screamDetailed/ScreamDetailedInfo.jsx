import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

export default function ScreamDetailedInfo({ scream, isHost }) {
  return (
    <>
      <Segment>
        <p>{scream.description}</p>
      </Segment>
      <Segment attached='bottom'>
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
