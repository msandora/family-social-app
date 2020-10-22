import React from 'react';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

export default function LikeButton() {
  return (
    <>
      <Popup
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
      />
    </>
  );
}
