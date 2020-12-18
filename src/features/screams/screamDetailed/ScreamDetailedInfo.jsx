import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import ScreamCarousel from './../screamComponents/ScreamCarousel';
import LikeScream from './../screamComponents/LikeScream';
import { deleteScreamInFirestore } from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';

export default function ScreamDetailedInfo({ scream, isHost }) {
  return (
    <>
      {scream.screamImages && scream.screamImages.length > 0 && (
        <Segment style={{ padding: 0 }}>
          <ScreamCarousel scream={scream} />
        </Segment>
      )}
      <Segment>
        <p>{scream.description}</p>
      </Segment>
      <Segment attached='bottom' clearing>
        <LikeScream scream={scream} />

        {isHost && (
          <>
            <Button
              type='button'
              color='red'
              icon='trash'
              onClick={() => deleteScreamInFirestore(scream.id)}
              floated='right'
            />
            <Button
              type='button'
              color='teal'
              icon='edit'
              as={Link}
              to={`/manageScream/${scream.id}`}
              floated='right'
            />
          </>
        )}
      </Segment>
    </>
  );
}
