import React from './node_modules/react';
import { Grid } from './node_modules/semantic-ui-react';
import EventList from './EventList';

export default function EventDashboard() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>right Column</h2>
      </Grid.Column>
    </Grid>
  );
}
