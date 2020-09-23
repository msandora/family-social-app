import React from 'react';
import { Grid } from 'semantic-ui-react';
import FamilyTree from '../FamilyTree/FamilyTree';
import { useSelector, useDispatch } from 'react-redux';
import { listenToFamilyFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToFamily } from '../familyActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

export default function FamilyDashboard() {
  const dispatch = useDispatch();
  const { family } = useSelector((state) => state.family);

  useFirestoreCollection({
    query: () => listenToFamilyFromFirestore(),
    data: (family) => dispatch(listenToFamily(family)),
    deps: [dispatch],
  });
  // console.log('listen', family);

  return (
    <Grid>
      <Grid.Column width={16}>
        <FamilyTree family={family} />
      </Grid.Column>
    </Grid>
  );
}
