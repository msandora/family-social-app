import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Popup } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const addButtonStyle = {
  position: 'fixed',
  left: '20px',
  bottom: '20px',
  zIndex: 1,
};

export default function CreateRecipe() {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <div style={addButtonStyle}>
      {authenticated && (
        <Popup
          position='right center'
          content='Create Recipe'
          trigger={
            <Button
              circular
              icon='add'
              size='massive'
              positive
              inverted
              as={NavLink}
              to='/createRecipe'
            />
          }
        />
      )}
    </div>
  );
}
