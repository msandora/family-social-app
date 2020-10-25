import React, { useState } from 'react';
import { Segment, Button, Header, Image, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ScreamCarousel from '../screamComponents/ScreamCarousel';
import LikeScream from '../screamComponents/LikeScream';
import UnauthModal from '../../auth/UnauthModal';

 function ScreamListItem({ scream }) {
 
  return (
        <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
    <Segment.Group>
      <Segment>
        <Header as='h5'>
          <Image
            circular
            src={scream.hostPhotoURL || '/assets/user.png'}
            as={Link}
            to={`/profile/${scream.hostUid}`}
          />
          <Header.Content>
            {scream.hostedBy}
            <Header.Subheader>
              {formatDistance(scream.createdAt, new Date())} ago
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
      <Segment style={{ padding: 0 }}>
        <ScreamCarousel scream={scream} />
      </Segment>
      <Segment>
        <div>{scream.description}</div>
      </Segment>
      <Segment attached clearing>
      <Button
          as={Link}
          to={`/screams/${scream.id}`}
          color='teal'
          floated='right'
          content='View'
        />
       <LikeScream  scream={scream} />

      </Segment>
    </Segment.Group>
          </>
  );
}

export default ScreamListItem;
