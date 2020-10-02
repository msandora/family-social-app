import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import UnauthModal from '../../auth/UnauthModal';

export default function ScreamDetailedHeader({ scream }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment clearing>
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
    </>
  );
}
