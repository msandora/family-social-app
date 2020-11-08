import React, {useRef,useState} from 'react';
import { Segment,Card,Form } from 'semantic-ui-react';
import ScreamCarousel from './../screamComponents/ScreamCarousel';
import LikeScream from './../screamComponents/LikeScream';
import MyButton from '../../../app/common/MyButton';
import { deleteScreamInFirestore } from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';
// graphql stuff 
import { 
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
  SUBMIT_COMMENT_MUTATION
  } from '../../../utils/graqphql';
import { useMutation } from '@apollo/react-hooks';
import LikeButton from '../../../utils/LikeButton';
import DeleteButton from '../../../utils/DeleteButton';
import firebase from '../../../app/config/firebase';
import moment from 'moment'

import { useLocation } from "react-router-dom";

export default function ScreamDetailedInfo({ scream, isHost,history }) {
  const user = firebase.auth().currentUser;
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId:scream.id,
      body: comment,
      userName:user.displayName
    }
  });

  let location = useLocation();
  console.log({location})
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const deleteScream = async (postId) => {
   await deletePost({
     variables:{postId, hostUid:scream.hostUid},
     update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      console.log({ data})
      data.getPosts = data.getPosts.filter(post => post.id != scream.id)
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    }
   })
}
  console.log({history})
  // but you can use a location instead
  // const location = {
  //   pathname: `/manageScream/${scream?.id}`,
  // }
  return (
    <>
      {scream?.photos && scream.photos?.length > 0 && (
        <Segment style={{ padding: 0 }}>
          <ScreamCarousel scream={scream && scream} />
        </Segment>
      )}
      <Segment>
        <p>{scream.description}</p>
      </Segment>
      <Segment attached='bottom' clearing>
      {user &&  <LikeButton user={user} scream={scream} /> }
        {/* <LikeScream scream={scream && scream} /> */}
        {/* {console.log("scream",scream && scream)} */}
        {isHost && (
          <>
            <MyButton
              onClick={() => deleteScream(scream.id)}
              // onClick={() => deleteScreamInFirestore(scream?.id)}
              // content='Delete'
              tip='Delete Post'
              color='red'
              icon='trash'
              linkRef={null}
            />
            <MyButton
              // onClick={() => history.replace(location)}
              // onClick={() => history.push(`/manageScream/${scream?.id}`)}
              tip='Manage Post'
              color='orange'
              icon='edit'
              linkRef={`/manageScream/${scream?.id}`}
              
            />
                {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {scream.comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.displayName === comment.userName && (
                    <DeleteButton postId={scream?.id} commentId={comment.id} userName={user.displayName}/>
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </Segment>
    </>
  );
}
