import React from 'react';
import RecipeListItem from './RecipeListItem';
import InfiniteScroll from 'react-infinite-scroller';

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
    </>
  );
}
