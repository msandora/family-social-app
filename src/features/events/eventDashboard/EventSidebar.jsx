import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

export default function EventSidebar({ loading }) {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <>
      {authenticated && (
        <Menu.Item as={NavLink} to='/createEvent'>
          <Button fluid positive inverted content='Create Event' />
        </Menu.Item>
      )}
    </>
  );
}
