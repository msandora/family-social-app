import React, { useState, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ScreamList from './ScreamList';
import { useSelector, useDispatch } from 'react-redux';
import ScreamListItemPlaceholder from './ScreamListItemPlaceholder';
import { fetchScreams } from '../screamActions';
import { RETAIN_SCREAM_STATE } from '../screamConstants';
import CreateScream from './CreateScream';
import { Mobile, NotMobile } from '../../../app/common/MediaQueries';

export default function ScreamDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { screams, moreScreams, lastVisible, retainState } = useSelector(
    (state) => state.scream
  );
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    console.log('ScreamDashboard', screams);
    if (retainState) return;
    setLoadingInitial(true);
    console.log("lastVisible", lastVisible);
    dispatch(fetchScreams(limit, lastVisible)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_SCREAM_STATE });
    };
  }, [dispatch, retainState]);

  function handleFetchNextScreams() {
    dispatch(fetchScreams(limit, lastVisible));
  }

  return (
    <>
      <CreateScream />
      <Grid>
        <NotMobile>
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
                screams={screams}
                getNextScreams={handleFetchNextScreams}
                loading={loading}
                moreScreams={moreScreams}
              />
            )}
          </Grid.Column>
          <Grid.Column width={6}></Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading} />
          </Grid.Column>
        </NotMobile>

        <Mobile>
          <Grid.Column width={16}>
            {loadingInitial && (
              <>
                <ScreamListItemPlaceholder />
                <ScreamListItemPlaceholder />
              </>
            )}
            {!loadingInitial && (
              <ScreamList
                screams={screams}
                getNextScreams={handleFetchNextScreams}
                loading={loading}
                moreScreams={moreScreams}
              />
            )}
          </Grid.Column>
          <Grid.Column width={16}>
            <Loader active={loading} />
          </Grid.Column>
        </Mobile>
      </Grid>
    </>
  );
}
