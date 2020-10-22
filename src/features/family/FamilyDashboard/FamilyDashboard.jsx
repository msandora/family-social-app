import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import FamilyTree from '../FamilyTree/FamilyTree';
import { useDispatch, useSelector } from 'react-redux';
import { getFamilyFromFirestore } from '../../../app/firestore/firestoreServices/firestoreFamilyHandler';
import { dataFromSnapshot } from '../../../app/firestore/firestoreService';
import { fetchFamily } from '../familyActions';

export default function FamilyDashboard() {
  const dispatch = useDispatch();

  const { family } = useSelector((state) => state.family);

  useEffect(() => {
    const unsubscribe = getFamilyFromFirestore({
      next: (snapshot) =>
        dispatch(
          fetchFamily(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        ),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  }, [dispatch]);
  // console.log('familydash', family);

  return (
    <Grid>
      <Grid.Column width={16}>
        {family && <FamilyTree family={family} />}
      </Grid.Column>
    </Grid>
  );
}
