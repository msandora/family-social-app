import React from 'react';
import { Segment, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteScreamInFirestore } from '../../../app/firestore/firestoreService';

export default function ScreamListItem({ scream }) {
  // console.log(scream);
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={scream.hostPhotoURL || '/assets/user.png'}
            />
            <Item.Content>
              <Item.Header content={scream.title} />
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profile/${scream.hostUid}`}>{scream.hostedBy}</Link>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <div style={{ whiteSpace: 'pre-wrap' }}>{scream.description}</div>
      </Segment>
      <Segment clearing>
        <Button
          onClick={() => deleteScreamInFirestore(scream.id)}
          content='Delete'
          color='red'
          floated='right'
        />
        <Button
          as={Link}
          to={`/screams/${scream.id}`}
          // onClick={() => selectScream(scream)}
          content='View'
          color='teal'
          floated='right'
        />
      </Segment>
    </Segment.Group>
  );
}
