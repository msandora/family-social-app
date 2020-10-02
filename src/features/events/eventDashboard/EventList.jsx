import React from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function EventList({
  events,
  getNextEvents,
  loading,
  moreEvents,
}) {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {events.map((event) => (
            <EventListItem event={event} key={event.id} />
          ))}
        </InfiniteScroll>
      )}
      {events.length === 0 && (
        <Segment placeholder>
          <Header icon>
            <Icon name='search' />
            No Events Match this Filter
          </Header>
          <Button primary onClick={() => window.location.reload()}>
            Refresh Events
          </Button>
        </Segment>
      )}
    </>
  );
}
