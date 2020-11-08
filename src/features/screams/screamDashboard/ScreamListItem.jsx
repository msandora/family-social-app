import React, { useState } from 'react';
import { Segment, Button, Header, Image,Icon,Label, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ScreamCarousel from '../screamComponents/ScreamCarousel';
import LikeScream from '../screamComponents/LikeScream';
import LikeButton from '../../../utils/LikeButton';
import UnauthModal from '../../auth/UnauthModal';
import moment from 'moment';
import firebase from '../../../app/config/firebase';
import MyPopup from '../../../utils/MyPopup'



function ScreamListItem({ scream }) {
  const [modalOpen, setModalOpen] = useState(false);
  const user = firebase.auth().currentUser;

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
                {/* {folrmatDistance(scream.createdAt, new Date())} ago */}
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
          {/* <LikeScream scream={scream}  /> */}
           {user &&  <LikeButton user={user} scream={scream} /> }

           <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/screams/${scream.id}`}>
            <Button basic color="grey" >
              <Icon name="comments" />
            </Button>
            <Label basic color="grey" pointing="left">
              {scream.commentCount}
            </Label>
          </Button>
        </MyPopup>
        </Segment>
      </Segment.Group>
    </>
  );
}

export default ScreamListItem;
