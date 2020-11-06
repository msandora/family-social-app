import React, { useState, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ScreamList from './ScreamList';
import { useSelector, useDispatch } from 'react-redux';
import ScreamListItemPlaceholder from './ScreamListItemPlaceholder';
import { fetchScreams } from '../screamActions';
import { RETAIN_SCREAM_STATE } from '../screamConstants';
import CreateScream from './CreateScream';

//graphql stuff
import {FETCH_POSTS_QUERY} from '../../../utils/graqphql'
import { useQuery } from '@apollo/react-hooks';


export default function ScreamDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { screams, moreScreams, lastVisible, retainState } = useSelector(
    (state) => state.scream
  );
  const [postsMix, setPostsMix] = useState([])
  const [hasMore, setHasMore] = useState(true)

  // const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchScreams(limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_SCREAM_STATE });
    };
  }, [dispatch, retainState]);

  function handleFetchNextScreams() {
    dispatch(fetchScreams(limit, lastVisible));
  }

  
  // graphql query for fetching recipes from mongodb 
  const { fetchMore,loading, error, data:{ getPosts: posts }} = useQuery(FETCH_POSTS_QUERY, {
    variables: {limit:2 ,skip:0},
  });
  console.log("posts", posts)
  // console.log(fetchMore)
  //end graphql 
  
  // getMore func to fetch more data during scrolling 
  const getMore = () => {
    // const { endCursor } = data.viewer.repositories.pageInfo;
    fetchMore({
      variables: {limit:2 ,skip:2 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log({prevResult})
        console.log({fetchMoreResult})
        let postsMix ;
        
        if( fetchMoreResult.getPosts == prevResult.getPosts ){
          console.log("new == old")
          postsMix = [...prevResult.getPosts];
           setHasMore(false)
        } else {
          console.log("new !== old")
         postsMix = [ ...prevResult.getPosts,
            ...fetchMoreResult.getPosts ];
            setHasMore(true)
        }
        console.log({postsMix})
        return postsMix;
        // return fetchMoreResult;
      }
    });
  }

  return (
    <>
      <CreateScream />
      <Grid>
        <Grid.Column width={6}></Grid.Column>
        <Grid.Column width={10}>
          {loadingInitial && (
            <>
              <ScreamListItemPlaceholder />
              <ScreamListItemPlaceholder />
            </>
          )}
          {!loadingInitial && (
            <ScreamList
              screams={posts}
              // screams={screams}
              getNextScreams={getMore}
              loading={loading}
              moreScreams={hasMore}
              // moreScreams={moreScreams}
            />
          )}
        </Grid.Column>

        <Grid.Column width={6}></Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    </>
  );
}
