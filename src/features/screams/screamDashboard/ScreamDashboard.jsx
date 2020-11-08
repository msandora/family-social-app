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
  const [hasMore, setHasMore] = useState(true)
  const [objToArrayA, setObjToArrayA] = useState([])
  const [objToArrayB, setObjToArrayB] = useState([])
  console.log({objToArrayA})
  console.log({objToArrayB})

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

   
function arrayEquals(a, b) {
  a.every((val, index) =>{ 
    // val === b[index]
    let objA =  Object.keys(val).map((key) => val[key]);
    console.log({objA})
    setObjToArrayA([...objA])

  });
  b.every((val, index) =>{ 
    // val === b[index]
    let objB = Object.keys(val).map((key) => val[key]);
    console.log({objB})
    setObjToArrayB([...objB])
  });
  return objToArrayA.every((val, index) => val === objToArrayB[index] );
}

  
  // graphql query for fetching recipes from mongodb 
  const { fetchMore,loading, error, data:{ getPosts: posts }} = useQuery(FETCH_POSTS_QUERY, {
    variables: {limit:2 ,skip:0},
  });
  // console.log("posts", posts)
  // console.log(fetchMore)
  //end graphql 
  
  // getMore func to fetch more data during scrolling 
  const getMore = () => {
    // const { endCursor } = data.viewer.repositories.pageInfo;
    fetchMore({
      variables: {limit:2 ,skip:2 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        let slicedArray ;
        console.log({prevResult})
        console.log({fetchMoreResult})
        let length = prevResult.getPosts.length; 
        console.log({length})
        slicedArray = prevResult.getPosts.slice(length-2 , length)
        console.log({slicedArray})
        let isPrevEqualToNext = arrayEquals(slicedArray,fetchMoreResult.getPosts);
        console.log({isPrevEqualToNext})
         if(isPrevEqualToNext) {
          console.log("new == old")
           setHasMore(false) 
          return prevResult;
        } else {
          console.log("new !== old")
           prevResult.getPosts = [ ...prevResult.getPosts,
            ...fetchMoreResult.getPosts ];
            setHasMore(true) 
            return prevResult;
        }
      }
    });
  }

 

  return (
    <>
      <CreateScream />
      <Grid>
        <Grid.Column width={6}></Grid.Column>
        <Grid.Column width={10}>
          {/* {loadingInitial && ( */}
          {loadingInitial && (
            <>
              <ScreamListItemPlaceholder />
              <ScreamListItemPlaceholder />
            </>
          )}
            {/* {loadingInitial && ( */}
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
