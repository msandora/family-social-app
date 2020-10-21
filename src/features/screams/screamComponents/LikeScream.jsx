import React from 'react';
import { Button, Popup ,Segment, Header, Icon,Label} from 'semantic-ui-react';

import {  useDispatch,useSelector } from 'react-redux';
import { likeScream,UnLikeScream } from '../screamActions';

export default function LikeButton({scream}) {
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
    <>
      {/* <Popup
        content='Like This'
        trigger={
          <Button
            as='div'
            labelPosition='right'
            onClick={() => console.log('Like')}
          >
            <Button primary>
              <Icon name='heart' />
              Like
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
              5
            </Label>
          </Button>
        }
      />

      <Popup
        content='UnLike This'
        trigger={
          <Button
            as='div'
            labelPosition='right'
            onClick={() => console.log('UnLike')}
          >
            <Button icon>
              <Icon name='heart' />
            </Button>
            <Label as='a' basic pointing='left'>
              5
            </Label>
          </Button>
        }
      /> */}


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
          </Segment>):scream.likeCount > 0 ? (
          <div className="">
          <Popup
        content='UnLike This'
        trigger={ 
          <Button as='div' labelPosition='right' onClick={handleUnLikeScream}>
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
    ) : (<div> 
      <Popup
        content='Like This'
        trigger={
<Button as='div' labelPosition='right'  onClick={handleLikeScream}>
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
 )
        }
    </>
  );
}
