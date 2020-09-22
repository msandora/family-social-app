import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const extra = (
  <>
    <Icon name='user' />
    Family
  </>
);

export default function ProfileCard({ profile }) {
  return (
    <Card
      as={Link}
      to={`/profile/${profile.id}`}
      image={profile.photoURL || '/assets/user.png'}
      header={profile.displayName}
      meta={null}
      description={null}
      extra={extra}
    />
  );
}
