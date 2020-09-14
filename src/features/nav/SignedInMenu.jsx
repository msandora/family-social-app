import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

export default function SignedInMenu({ signOut }) {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push('/');
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUserProfile.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing='top right' text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text='My Events' icon='calendar' />
          <Dropdown.Item
            as={Link}
            to={`/people`}
            text='My Network'
            icon='users'
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile.id}`}
            text='My Profile'
            icon='user'
          />
          <Dropdown.Item
            as={Link}
            to='/account'
            text='My Account'
            icon='settings'
          />
          <Dropdown.Item onClick={handleSignOut} text='Sign Out' icon='power' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
