import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../recipeActions';

export default function RecipeFilters({ loading }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);

  const { filter } = useSelector((state) => state.recipe);
  function handleFilterMyRecipes() {
    window.scrollTo(0, 0);
    console.log('handleFilterMyRecipes');
  }
  function handleFilterAllRecipes() {
    window.scrollTo(0, 0);
    dispatch(setFilter('all'));
  }
  function handleFilterBreakfast() {
    window.scrollTo(0, 0);
    dispatch(setFilter('breakfast'));
  }
  function handleFilterDinner() {
    window.scrollTo(0, 0);
    dispatch(setFilter('dinner'));
  }
  function handleFilterDesserts() {
    window.scrollTo(0, 0);
    dispatch(setFilter('desserts'));
  }
  function handleFilterBeverages() {
    window.scrollTo(0, 0);
    dispatch(setFilter('beverages'));
  }

  return (
    <>
      {authenticated && (
        <Menu vertical size='large' style={{ width: '100%' }}>
          <Header icon='filter' attached color='teal' content='Filters' />
          <Menu.Item
            content='All Recipes'
            active={filter === 'all'}
            onClick={handleFilterAllRecipes}
            disabled={loading}
          />
          <Menu.Item
            content='My Recipes'
            // active={filter === 'all'}
            onClick={handleFilterMyRecipes}
            // disabled={loading}
          />
          <Menu.Item
            content='Breakfast'
            active={filter === 'breakfast'}
            onClick={handleFilterBreakfast}
            disabled={loading}
          />
          <Menu.Item
            content='Dinner'
            active={filter === 'dinner'}
            onClick={handleFilterDinner}
            disabled={loading}
          />
          <Menu.Item
            content='Desserts'
            active={filter === 'desserts'}
            onClick={handleFilterDesserts}
            disabled={loading}
          />
          <Menu.Item
            content='Beverages'
            active={filter === 'beverages'}
            onClick={handleFilterBeverages}
            disabled={loading}
          />
        </Menu>
      )}
    </>
  );
}
