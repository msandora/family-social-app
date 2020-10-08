import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';
import ScreamDetailedHeader from './ScreamDetailedHeader';
import ScreamDetailedInfo from './ScreamDetailedInfo';
import ScreamDetailedChat from './ScreamDetailedChat';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToScreamFromFirestore } from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { listenToSelectedScream } from '../screamActions';

export default function ScreamDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const scream = useSelector((state) => state.scream.selectedScream);
  const { loading, error } = useSelector((state) => state.async);
  const isHost = scream?.hostUid === currentUser?.uid;

  useFirestoreDoc({
    query: () => listenToScreamFromFirestore(match.params.id),
    data: (scream) => dispatch(listenToSelectedScream(scream)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!scream && !error))
    return <LoadingComponent content='Loading scream...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment.Group>
          <ScreamDetailedHeader scream={scream} />
          <ScreamDetailedInfo scream={scream} isHost={isHost} />
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={6}>
        <ScreamDetailedChat screamId={scream.id} />
      </Grid.Column>
    </Grid>
  );
}
