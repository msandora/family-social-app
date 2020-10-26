import React, { useEffect, useState } from 'react';
import { Button, Popup, Segment, Header, Icon, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { likeScream, UnLikeScream, getLikes } from '../screamActions';

export default function LikeButton({ scream }) {
  let [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const { authenticated, currentUser } = useSelector((state) => state.auth);
  const { likes } = useSelector((state) => state.scream);
  // console.log({uid})
  // console.log({scream})
  likes && console.log({ likes });
  function likedScream() {
    if (
      likes &&
      likes.find(
        (like) =>
          like.screamId === scream.id &&
          like.userHandle === currentUser &&
          currentUser.uid
      )
    )
      return true;
    else return false;
  }
  function handleLikeScream() {
    dispatch(likeScream(scream));
  }
  function handleUnLikeScream() {
    dispatch(UnLikeScream(scream));
  }
  useEffect(() => {
    dispatch(getLikes());
  }, [dispatch, scream]);
  return (
    <>
      {!authenticated ? (
        <Segment
          textAlign='center'
          attached='top'
          inverted
          color='teal'
          style={{ border: 'none' }}
        >
          <Header>{'Sign in to view and Like '}</Header>
        </Segment>
      ) : likedScream() || liked ? (
        <div className=''>
          <Popup
            content='UnLike This'
            trigger={
              <Button
                as='div'
                labelPosition='right'
                onClick={() => {
                  handleUnLikeScream();
                  setLiked(false);
                }}
              >
                <Button color='blue'>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                  {scream.likeCount ? scream.likeCount : 0}
                </Label>
              </Button>
            }
          />
        </div>
      ) : (
        <div>
          <Popup
            content='Like This'
            trigger={
              <Button
                as='div'
                labelPosition='right'
                onClick={() => {
                  handleLikeScream();
                  setLiked(true);
                }}
              >
                <Button color='blue' basic>
                  <Icon name='heart' />
                  Like
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                  {scream.likeCount ? scream.likeCount : 0}
                </Label>
              </Button>
            }
          />
        </div>
      )}
    </>
  );
}
