import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';
import { NotMobile } from '../../app/layout/MediaQueries';

export default function NavBar() {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' />
        </Menu.Item>

        <NotMobile>
          <Menu.Item as={NavLink} to='/events' name='Events' />
          <Menu.Item as={NavLink} exact to='/screams' name='Social' />
          <Menu.Item as={NavLink} exact to='/recipes' name='Recipes' />
          <Menu.Item as={NavLink} to='/family-tree' name='Family Tree' />
          {/* <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' /> */}
        </NotMobile>

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
