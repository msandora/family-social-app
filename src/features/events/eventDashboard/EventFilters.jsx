import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-calendar';
import {
  useSelector,
  //useDispatch
} from 'react-redux';
// import { setFilter, setStartDate } from '../eventActions';

export default function EventFilters({ loading, setPredicate, predicate }) {
  // const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  // const { filter, startDate } = useSelector((state) => state.event);
  return (
    <>
      {authenticated && (
        <Menu vertical size='large' style={{ width: '100%' }}>
          <Header icon='filter' attached color='teal' content='Filters' />
          <Menu.Item
            content='All Events'
            active={predicate.get('filter') === 'all'}
            onClick={() => setPredicate('filter', 'all')}
            disabled={loading}
          />
          <Menu.Item
            content="I'm going"
            active={predicate.get('filter') === 'isGoing'}
            onClick={() => setPredicate('filter', 'isGoing')}
            disabled={loading}
          />
          <Menu.Item
            content="I'm hosting"
            active={predicate.get('filter') === 'isHost'}
            onClick={() => setPredicate('filter', 'isHost')}
            disabled={loading}
          />
        </Menu>
      )}
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar
        onChange={(date) => setPredicate('startDate', date)}
        value={predicate.get('startDate') || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
