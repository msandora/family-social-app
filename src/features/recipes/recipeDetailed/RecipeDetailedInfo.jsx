import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
// import { format } from 'date-fns';

export default function RecipeDetailedInfo({ recipe }) {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{recipe.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            {/* <span>{format(recipe.date, 'MMMM d, yyyy h:mm a')}</span> */}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}
