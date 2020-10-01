import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../recipeActions';

export default function RecipeFilters({ loading }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { filter } = useSelector((state) => state.recipe);
  return (
    <>
      {authenticated && (
        <Menu vertical size='large' style={{ width: '100%' }}>
          <Header icon='filter' attached color='teal' content='Filters' />
          <Menu.Item
            content='All Recipes'
            active={filter === 'all'}
            onClick={() => dispatch(setFilter('all'))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm going"
            active={filter === 'isGoing'}
            onClick={() => dispatch(setFilter('isGoing'))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm hosting"
            active={filter === 'isHost'}
            onClick={() => dispatch(setFilter('isHost'))}
            disabled={loading}
          />
        </Menu>
      )}
    </>
  );
}
