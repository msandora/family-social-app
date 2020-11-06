import React from 'react';
import { Segment } from 'semantic-ui-react';
import ScreamCarousel from './../screamComponents/ScreamCarousel';
import LikeScream from './../screamComponents/LikeScream';
import MyButton from '../../../app/common/MyButton';
import { deleteScreamInFirestore } from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';
// graphql stuff 
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY} from '../../../utils/graqphql';
import { useMutation } from '@apollo/react-hooks';

import { useLocation } from "react-router-dom";

export default function ScreamDetailedInfo({ scream, isHost,history }) {
  let location = useLocation();
  console.log({location})
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const deleteScream = async (postId) => {
   await deletePost({
     variables:{postId, hostUid:scream.hostUid},
     update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = data.getPosts.filter(post => post.id != result.data.createPost.id )
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
        <LikeScream scream={scream && scream} />
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
          </>
        )}
      </Segment>
    </>
  );
}
