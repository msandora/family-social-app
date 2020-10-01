import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

export default function ScreamFilters({ loading }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <>
      {authenticated && (
        <Segment>
          <Menu.Item as={NavLink} to='/createScream'>
            <Button fluid positive inverted content='Create Post' />
          </Menu.Item>
        </Segment>
      )}
    </>
  );
}
