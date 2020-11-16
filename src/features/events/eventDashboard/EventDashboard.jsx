import React, { useState, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector, useDispatch } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { fetchEvents } from '../eventActions';
import EventsFeed from './EventFeed';
import { RETAIN_EVENT_STATE } from '../eventConstants';
import CreateEvent from './CreateEvent';
import { useMediaQuery } from 'react-responsive';

export default function EventDashboard() {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  const limit = 2;
  const dispatch = useDispatch();
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_EVENT_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
  }
  // console.log('my events', events);

  return (
    <>
      <CreateEvent />

      <Grid>
        <Grid.Column width={isPortrait ? 16 : 6}>
          {authenticated && <EventsFeed />}
          <EventFilters loading={loading} />
        </Grid.Column>
        <Grid.Column width={isPortrait ? 16 : 10}>
          {loadingInitial && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )}
          {!loadingInitial && (
            <EventList
              events={events}
              getNextEvents={handleFetchNextEvents}
              loading={loading}
              moreEvents={moreEvents}
            />
          )}
        </Grid.Column>

        <Grid.Column width={isPortrait ? 16 : 10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    </>
  );
}
