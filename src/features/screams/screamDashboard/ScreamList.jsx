import React from 'react';
import ScreamListItem from './ScreamListItem';
import InfiniteScroll from 'react-infinite-scroller';

export default function ScreamList({
  screams,
  getNextScreams,
  loading,
  moreScreams,
}) {
  return (
    <>
      {screams.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextScreams}
          hasMore={!loading && moreScreams}
          initialLoad={false}
        >
          {screams.map((scream) => (
            <ScreamListItem scream={scream} key={scream.id} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
