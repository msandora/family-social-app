import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

export default function RecipeSidebar({ loading }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <>
      {authenticated && (
        <Segment>
          <Menu.Item as={NavLink} to='/createRecipe'>
            <Button fluid positive inverted content='Create Recipe' />
          </Menu.Item>
        </Segment>
      )}
    </>
  );
}
