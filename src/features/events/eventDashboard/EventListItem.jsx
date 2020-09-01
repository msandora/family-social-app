import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../eventActions';
import { format } from 'date-fns';

export default function EventListItem({ event }) {
  const dispatch = useDispatch();
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment>
        <div style={{ whiteSpace: 'pre-wrap' }}>{event.description}</div>
      </Segment>
      <Segment clearing>
        <Button
          onClick={() => dispatch(deleteEvent(event.id))}
          content='Delete'
          color='red'
          floated='right'
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          // onClick={() => selectEvent(event)}
          content='View'
          color='teal'
          floated='right'
        />
      </Segment>
    </Segment.Group>
  );
}
