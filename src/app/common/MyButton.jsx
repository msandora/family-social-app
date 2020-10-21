import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Popup } from 'semantic-ui-react';

export default ({ content, onClick, tip, color, icon, isLink, linkRef }) => (
  <>
    <Popup
      content={tip}
      trigger={
        <Button
          onClick={onClick}
          content={content}
          icon={icon}
          as={Link}
          to={linkRef || '/'}
          color={color}
          floated='right'
        />
      }
    />
  </>
);
