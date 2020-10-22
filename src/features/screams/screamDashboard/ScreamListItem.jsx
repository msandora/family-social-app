import React from 'react';
import { Segment, Button, Header, Image, Icon,Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ScreamCarousel from '../screamComponents/ScreamCarousel';
import LikeScream from '../screamComponents/LikeScream';

import {  useDispatch,useSelector } from 'react-redux';
import { likeScream,UnLikeScream } from '../screamActions';



 function ScreamListItem({ scream }) {
  //  console.log({scream})
  const dispatch = useDispatch();
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
          {
          !authenticated ? ( <Segment
            textAlign='center'
            attached='top'
            inverted
            color='teal'
            style={{ border: 'none' }}
          >
            <Header>
              { 'Sign in to view and Like ' }
            </Header>
          </Segment>):scream.likeCount > 0 ? (<div className=""> <Button as='div' labelPosition='right' onClick={handleUnLikeScream}>
      <Button color='blue'>
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
    </div>
    ) : (<div> <Button as='div' labelPosition='right'  onClick={handleLikeScream}>
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
</div>
 )
        }
 
      </Segment>
    </Segment.Group>
  );
}

export default ScreamListItem;
