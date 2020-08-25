import React from 'react';
import { Button, Segment, Item, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function EventDetailedHeader({ event }) {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button size='small'>Cancel My Place</Button>
        <Button size='small' color='teal'>
          JOIN THIS EVENT
        </Button>

        <Button
          as={Link}
          to={`/manage/${event.id}`}
          size='small'
          color='orange'
          floated='right'
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
