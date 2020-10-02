import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setStartDate } from '../eventActions';

export default function EventFilters({ loading }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { filter, startDate } = useSelector((state) => state.event);

  function handleFilterAllEvents() {
    window.scrollTo(0, 0);
    dispatch(setFilter('all'));
  }
  function handleFilterisGoing() {
    window.scrollTo(0, 0);
    dispatch(setFilter('isGoing'));
  }

  function handleFilterisHost() {
    window.scrollTo(0, 0);
    dispatch(setFilter('isHost'));
  }

  function handleFilterDate(date) {
    window.scrollTo(0, 0);
    dispatch(setStartDate(date));
  }

  return (
    <>
      {authenticated && (
        <Menu vertical size='large' style={{ width: '100%' }}>
          <Header icon='filter' attached color='teal' content='Filters' />
          <Menu.Item
            content='All Events'
            active={filter === 'all'}
            onClick={handleFilterAllEvents}
            disabled={loading}
          />
          <Menu.Item
            content="I'm going"
            active={filter === 'isGoing'}
            onClick={handleFilterisGoing}
            disabled={loading}
          />
          <Menu.Item
            content="I'm hosting"
            active={filter === 'isHost'}
            onClick={handleFilterisHost}
            disabled={loading}
          />
        </Menu>
      )}
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar
        onChange={(date) => handleFilterDate(date)}
        value={startDate || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
