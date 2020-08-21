import React from './node_modules/react';
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
} from './node_modules/semantic-ui-react';
import EventListAttendee from './EventListAttendee';

export default function EventListItem() {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image />
            <Item.Content>
              <Item.Header />
              <Item.Description>Hosted by Boy</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> Date
          <Icon name='marker' /> Venue
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          <EventListAttendee />
          <EventListAttendee />
          <EventListAttendee />
        </List>
      </Segment>
      <Segment clearing>
        <div>Description of Event</div>
        <Button content='View' color='teal' floated='right' />
      </Segment>
    </Segment.Group>
  );
}
