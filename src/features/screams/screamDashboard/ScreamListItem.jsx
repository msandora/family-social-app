import React, { useState } from 'react';
import { Segment, Button, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ScreamCarousel from '../screamComponents/ScreamCarousel';
import LikeScream from '../screamComponents/LikeScream';
import UnauthModal from '../../auth/UnauthModal';
import moment from 'moment';


function ScreamListItem({ scream }) {
  const [modalOpen, setModalOpen] = useState(false);
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
              {moment(scream.createdAt).fromNow(true)} ago
                {/* {formatDistance(scream.createdAt, new Date())} ago */}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
        {scream.photos && scream.photos.length > 0 && (
          <Segment style={{ padding: 0 }}>
            <ScreamCarousel scream={scream} />
          </Segment>
        )}
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
          <LikeScream scream={scream}  />
        </Segment>
      </Segment.Group>
    </>
  );
}

export default ScreamListItem;
