import React, {
  //useEffect,
  useState,
} from 'react';
import { Button, Popup, Icon, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  likeScream,
  UnLikeScream,
  //getLikes
} from '../screamActions';
import UnauthModal from '../../auth/UnauthModal';

export default function LikeButton({ scream }) {
  const dispatch = useDispatch();
  let [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated, currentUser } = useSelector((state) => state.auth);
  const { likes, screams } = useSelector((state) => state.scream);
  // likes.length > 0 && console.log({likes})
  // console.log({uid})
  // console.log({screams})
  // console.log({scream})

  // let { uid } = currentUser;
  // console.log("uid",uid)
  // likes?.length > 0 && console.log('userHandle', likes[0].userHandle);
  // scream  && console.log("scream.id",scream.id);
  // likes?.length > 0 &&  console.log("screamId",likes[0].screamId)
  function IslikedScream() {
    if (
      likes?.length > 0 &&
      likes.find(
        (like) =>
          like.screamId === scream.id && like.userHandle === currentUser?.uid
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
  // useEffect(() => {
  //   dispatch(getLikes(screams));
  // }, [dispatch, screams]);

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
      ) : IslikedScream() ? (
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
