import React, { useEffect } from 'react';
import { Segment, Header, Button, Grid } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToSelectedPerson, clearSelectedPerson } from '../familyActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import {
  listenToPersonFromFirestore,
  updatePersonInFirestore,
} from '../../../app/firestore/firestoreServices/firestoreFamilyHandler';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { toast } from 'react-toastify';

export default function PersonForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedPerson } = useSelector((state) => state.family);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/updatePerson') return;
    dispatch(clearSelectedPerson());
  }, [dispatch, location.pathname]);

  const initialValues = selectedPerson ?? {
    firstName: '',
    middleName: '',
    lastName: '',
    nickName: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('You must provide a first name'),
    lastName: Yup.string().required('You must provide a last name'),
  });

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedPerson?.id &&
      location.pathname !== '/updatePerson',
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // console.log(values);
            await updatePersonInFirestore(values);
            setSubmitting(false);
            dispatch(clearSelectedPerson());

            history.push('/family-tree');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Grid>
              <Grid.Column width={16}>
                <Header
                  as='h1'
                  size='large'
                  color='teal'
                  content='Manage Person'
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <MyTextInput
                  name='firstName'
                  placeholder='First Name'
                  label='First Name'
                />
                <MyTextInput
                  name='middleName'
                  placeholder='Middle Name'
                  label='Middle Name'
                />
                <MyTextInput
                  name='lastName'
                  placeholder='Last Name'
                  label='Last Name'
                />
                <MyDateInput
                  name='dateOfBirth'
                  placeholderText='Date Of Birth'
                  dateFormat='MMMM d, yyyy'
                  autoComplete='off'
                  label='Birth date'
                />
              </Grid.Column>

              <Grid.Column width={8}>
                <MyTextInput
                  name='nickName'
                  placeholder='Nick Name'
                  label='Nick Name'
                />
                <MyTextInput
                  name='maidenName'
                  placeholder='Maiden Name'
                  label='Maiden Name'
                />
                <MyTextArea
                  name='bio'
                  placeholder='Bio'
                  rows={3}
                  label='About'
                />
              </Grid.Column>

              <Grid.Column width={16}>
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
              </Grid.Column>
            </Grid>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
