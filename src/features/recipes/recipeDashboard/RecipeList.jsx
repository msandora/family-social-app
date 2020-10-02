import React from 'react';
import RecipeListItem from './RecipeListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function RecipeList({
  recipes,
  getNextRecipes,
  loading,
  moreRecipes,
}) {
  return (
    <>
      {recipes.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextRecipes}
          hasMore={!loading && moreRecipes}
          initialLoad={false}
        >
          {recipes.map((recipe) => (
            <RecipeListItem recipe={recipe} key={recipe.id} />
          ))}
        </InfiniteScroll>
      )}
      {recipes.length === 0 && (
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
