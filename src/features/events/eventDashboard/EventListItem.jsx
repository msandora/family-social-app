import React from 'react';
import { Segment, Icon, List, Button, Header, Image } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function EventListItem({ event }) {
  return (
    <Segment.Group>
      <Segment>
        <Header as='h5'>
          <Image
            circular
            src={event.hostPhotoURL || '/assets/user.png'}
            as={Link}
            to={`/profile/${event.hostUid}`}
          />
          <Header.Content>
            {event.title}
            <Header.Subheader>
              Hosted by{' '}
              <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
            </Header.Subheader>
          </Header.Content>
        </Header>
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
      <Segment clearing attached='bottom'>
        <div>{event.description}</div>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}
