import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ScreamList from './ScreamList';
import { useSelector, useDispatch } from 'react-redux';
import ScreamListItemPlaceholder from './ScreamListItemPlaceholder';
import { fetchScreams } from '../screamActions';
import { useState } from 'react';
import { useEffect } from 'react';
import { RETAIN_STATE } from '../screamConstants';
import ScreamSidebar from './ScreamSidebar';

export default function ScreamDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {
    screams,
    moreScreams,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.scream);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchScreams(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextScreams() {
    dispatch(fetchScreams(filter, startDate, limit, lastVisible));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
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
        <ScreamSidebar loading={loading} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
