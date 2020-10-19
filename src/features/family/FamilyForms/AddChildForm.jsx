import React, { useEffect } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToSelectedPerson, clearSelectedPerson } from '../familyActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { listenToPersonFromFirestore } from '../../../app/firestore/firestoreServices/firestoreFamilyHandler';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function AddChildForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedPerson } = useSelector((state) => state.family);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/addChild') return;
    dispatch(clearSelectedPerson());
  }, [dispatch, location.pathname]);

  const initialValues = selectedPerson ?? {
    firstName: '',
    lastName: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('You must provide a first name'),
    lastName: Yup.string().required('You must provide a last name'),
  });

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedPerson?.id &&
      location.pathname !== '/addChild',
    query: () => listenToPersonFromFirestore(match.params.id),
    data: (family) => dispatch(listenToSelectedPerson(family)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Family Details' />
            <MyTextInput name='firstName' placeholder='First Name' />
            <MyTextInput name='middleName' placeholder='Middle Name' />
            <MyTextInput name='lastName' placeholder='Last Name' />
            <MyTextInput name='nickName' placeholder='Nick Name' />
            <MyTextInput name='maidenName' placeholder='Maiden Name' />
            <MyTextArea name='bio' placeholder='Bio' rows={3} />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to='/family-tree'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
