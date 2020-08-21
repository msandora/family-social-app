import React from './node_modules/react';
import { List, Image } from './node_modules/semantic-ui-react';

export default function EventListAttendee() {
  return (
    <List.Item>
      <Image size='mini' circular src='/assets/user.png' />
    </List.Item>
  );
}
