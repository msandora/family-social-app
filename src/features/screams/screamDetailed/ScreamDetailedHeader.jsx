import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import moment from 'moment';


export default function ScreamDetailedHeader({ scream }) {
  return (
    <Segment clearing>
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
          {moment(scream.createdAt).fromNow(true)} ago
            {/* {formatDistance(scream.createdAt, new Date())} ago */}
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
}
