import React from 'react';
import RecipeListItem from './RecipeListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Header, Icon, Segment, Loader } from 'semantic-ui-react';


export default function RecipeList({
  recipesToLoad,
  getNextRecipes,
  loading,
  hasMore,
}) {
console.log({hasMore})
  return (
    <>
      {recipesToLoad?.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextRecipes}
          // hasMore={skip}
          hasMore={hasMore}
          initialLoad={false}
          loader={loading && <Loader active inline='centered' />}
        >
          {recipesToLoad?.map((recipe) => (
            <RecipeListItem recipe={recipe} key={recipe.id} />
          ))}
        </InfiniteScroll>
      )}
      {/* <button onClick={getNextRecipes}>fetchMore</button> */}
      { recipesToLoad?.length === 0 && (
        <Segment placeholder>
          <Header icon>
            <Icon name='search' />
            No Recipes Match this Filter
          </Header>
          <Button primary onClick={() => window.location.reload()}>
            Refresh Recipes
          </Button>
        </Segment>
      )}
    </>
  );
}
