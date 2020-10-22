import React, { useState } from 'react';
import { Segment, Button, Header, Image, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ScreamCarousel from '../screamComponents/ScreamCarousel';
// import LikeScream from '../screamComponents/LikeScream';
import { useDispatch, useSelector } from 'react-redux';
import { likeScream, UnLikeScream } from '../screamActions';
import UnauthModal from '../../auth/UnauthModal';

function ScreamListItem({ scream }) {
  //  console.log({scream})
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  function handleLikeScream() {
    // likeScream(scream)
    dispatch(likeScream(scream));
  }
  function handleUnLikeScream() {
    // UnLikeScream(scream)
    dispatch(UnLikeScream(scream));
  }
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
          {!authenticated ? (
            <>
              <Button
                as='div'
                labelPosition='right'
                onClick={() => setModalOpen(true)}
              >
                <Button color='blue'>
                  <Icon name='heart' />
                  UnLike
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                  {scream.likeCount ? scream.likeCount : 0}
                </Label>
              </Button>
              <Button
                onClick={() => setModalOpen(true)}
                color='teal'
                floated='right'
                content='View'
              />
            </>
          ) : scream.likeCount > 0 ? (
            <>
              <Button
                as='div'
                labelPosition='right'
                onClick={handleUnLikeScream}
              >
                <Button color='blue'>
                  <Icon name='heart' />
                  UnLike
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                  {scream.likeCount ? scream.likeCount : 0}
                </Label>
              </Button>
              <Button
                as={Link}
                to={`/screams/${scream.id}`}
                color='teal'
                floated='right'
                content='View'
              />
            </>
          ) : (
            <>
              <Button as='div' labelPosition='right' onClick={handleLikeScream}>
                <Button color='blue' basic>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                  {scream.likeCount ? scream.likeCount : 0}
                </Label>
              </Button>
              <Button
                as={Link}
                to={`/screams/${scream.id}`}
                color='teal'
                floated='right'
                content='View'
              />
            </>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}

export default ScreamListItem;
