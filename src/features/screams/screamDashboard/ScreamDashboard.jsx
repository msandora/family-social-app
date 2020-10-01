import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ScreamList from './ScreamList';
import ScreamSidebar from './ScreamSidebar';
import { useSelector, useDispatch } from 'react-redux';
import ScreamListItemPlaceholder from './ScreamListItemPlaceholder';
import { fetchScreams } from '../screamActions';
import { RETAIN_STATE } from '../screamConstants';

export default function ScreamDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { screams, moreScreams, lastVisible, retainState } = useSelector(
    (state) => state.scream
  );
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchScreams(limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, retainState]);

  function handleFetchNextScreams() {
    dispatch(fetchScreams(limit, lastVisible));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <ScreamListItemPlaceholder />
            <ScreamListItemPlaceholder />
          </>
        )}
        <ScreamList
          screams={screams}
          getNextScreams={handleFetchNextScreams}
          loading={loading}
          moreScreams={moreScreams}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamSidebar />
        {/* {authenticated && <ScreamFeed />} */}
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
