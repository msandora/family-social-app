import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

export default function SignedInMenu({ signOut }) {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

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

  const trigger = (
    <span>
      <Image avatar src={currentUserProfile?.photoURL || '/assets/user.png'} />{' '}
      {currentUserProfile?.displayName}
    </span>
  );

  return (
    <Menu.Item position='right'>
      <Dropdown pointing='top right' trigger={trigger}>
        <Dropdown.Menu>
          {isPortrait ? (
            <>
              <Dropdown.Item
                as={Link}
                to={`/screams`}
                text='Social Feed'
                icon='users'
              />
              <Dropdown.Item
                as={Link}
                to={`/events`}
                text='Events'
                icon='calendar'
              />
              <Dropdown.Item
                as={Link}
                to={`/recipes`}
                text='Recipes'
                icon='food'
              />
              <Dropdown.Item
                as={Link}
                to={`/family-tree`}
                text='Family Tree'
                icon='users'
              />
              {/* <Dropdown.Item
              as={Link}
              to={`/sandbox`}
              text='Sandbox'
              icon='users'
            /> */}
            </>
          ) : null}
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
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
