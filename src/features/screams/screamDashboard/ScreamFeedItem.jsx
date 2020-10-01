import React from 'react';
import { Feed } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';

export default function ScreamFeedItem({ post }) {
  let summary;
  switch (post.code) {
    case 'joined-scream':
      summary = (
        <>
          <a href={`/profile/${post.userUid}`}>{post.displayName} </a> has
          signed up to <a href={`/screams/${post.screamId}`}>{post.title}</a>
        </>
      );
      break;
    case 'left-scream':
      summary = (
        <>
          <a href={`/profile/${post.userUid}`}>{post.displayName} </a> has
          cancelled their place on{' '}
          <a href={`/screams/${post.screamId}`}>{post.title}</a>
        </>
      );
      break;
    default:
      summary = 'Something happened';
      break;
  }
  return (
    <Feed.Event>
      <Feed.Label image={post.photoURL} />
      <Feed.Content>
        <Feed.Date>
          {formatDistance(new Date(post.date), new Date())} ago
        </Feed.Date>
        <Feed.Summary>{summary}</Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}
