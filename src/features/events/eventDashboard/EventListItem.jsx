import React from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

export default function EventListItem({ event }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-10px' }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name='marker' /> {event.venue.address}
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
          onClick={() => deleteEventInFirestore(event.id)}
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
