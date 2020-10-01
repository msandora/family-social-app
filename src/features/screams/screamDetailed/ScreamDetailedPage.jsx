import React from 'react';
import { Grid } from 'semantic-ui-react';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToScreamFromFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';
import { listenToScreams, listenToSelectedScream } from '../screamActions';

export default function ScreamDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const scream = useSelector((state) =>
    state.scream.screams.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);
  const isHost = scream?.hostUid === currentUser?.uid;
  console.log(scream);
  useFirestoreDoc({
    query: () => listenToScreamFromFirestore(match.params.id),
    data: (scream) => dispatch(listenToScreams([scream])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!scream && !error))
    return <LoadingComponent content='Loading scream...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ScreamDetailedHeader scream={scream} isHost={isHost} />
        <ScreamDetailedInfo scream={scream} />
        <ScreamDetailedChat screamId={scream.id} />
      </Grid.Column>
      <Grid.Column width={6}>ScreamDetailedSidebar</Grid.Column>
    </Grid>
  );
}
