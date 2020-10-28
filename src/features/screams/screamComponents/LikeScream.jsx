import React, { useEffect, useState } from 'react';
import { Button, Popup, Segment, Header, Icon, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { likeScream, UnLikeScream, getLikes } from '../screamActions';
import UnauthModal from '../../auth/UnauthModal';

export default function LikeButton({ scream }) {
  const dispatch = useDispatch();
  let [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated, currentUser } = useSelector((state) => state.auth);
  const { likes } = useSelector((state) => state.scream);
  // console.log({uid})
  // console.log({scream})
  let { uid } = currentUser;
  // likes && console.log({ likes });
  function likedScream() {
    if (
      likes &&
      likes.find(
        (like) => like.screamId === scream.id && like.userHandle === uid
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
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}

      {!authenticated ? (
        <Button
          as='div'
          labelPosition='right'
          onClick={() => setModalOpen(true)}
        >
          <Button color='blue'>
            <Icon name='heart' />
            Sign In
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {scream.likeCount ? scream.likeCount : 0}
          </Label>
        </Button>
      ) : likedScream() || liked ? (
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
                UnLike
              </Button>
              <Label as='a' basic color='blue' pointing='left'>
                {scream.likeCount ? scream.likeCount : 0}
              </Label>
            </Button>
          }
        />
      ) : (
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
      )}
    </>
  );
}
