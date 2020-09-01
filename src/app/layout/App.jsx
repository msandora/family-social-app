import React from 'react';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';

export default function App() {
  const { key } = useLocation();

  return (
    <>
      <ModalManager />
      <Route exact path='/' component={HomePage} />
      {/* Anything with forward slash plus anything else */}
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              {/* <EventDashboard
              formOpen={formOpen}
              setFormOpen={setFormOpen}
              selectEvent={handleSelectEvent}
              selectedEvent={selectedEvent}
              /> */}
            </Container>
          </>
        )}
      />
    </>
  );
}

// export default App;
