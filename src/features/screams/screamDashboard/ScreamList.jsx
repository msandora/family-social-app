import React, {useEffect} from 'react';
import ScreamListItem from './ScreamListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function ScreamList({
  screams,
  getNextScreams,
  loading,
  moreScreams,
}) {

  return (
    <>
      {screams?.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextScreams}
          hasMore={!loading && moreScreams}
          initialLoad={false}
        >
          {screams?.map((scream) => (
            <ScreamListItem scream={scream} key={scream.id} />
          ))}
        </InfiniteScroll>
      )}
      {/* <button onClick={getNextScreams}>fetchMore</button> */}
      {screams?.length === 0 && (
        <Segment placeholder>
          <Header icon>
            <Icon name='search' />
            No Posts Here
          </Header>
          <Button primary onClick={() => window.location.reload()}>
            Refresh Posts
          </Button>
        </Segment>
      )}
    </>
  );
}
