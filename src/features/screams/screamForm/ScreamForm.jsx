import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToSelectedScream, clearSelectedScream } from '../screamActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import {
  listenToScreamFromFirestore,
  updateScreamInFirestore,
  addScreamToFirestore,
} from '../../../app/firestore/firestoreServices/screamsHandler';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function ScreamForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedScream } = useSelector((state) => state.scream);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/createScream') return;
    dispatch(clearSelectedScream());
  }, [dispatch, location.pathname]);

  const initialValues = selectedScream ?? {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    description: Yup.string().required(),
  });

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedScream?.id &&
      location.pathname !== '/createScream',
    query: () => listenToScreamFromFirestore(match.params.id),
    data: (scream) => dispatch(listenToSelectedScream(scream)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading scream...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedScream
              ? await updateScreamInFirestore(values)
              : await addScreamToFirestore(values);
            setSubmitting(false);
            history.push('/screams');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Post Details' />
            <MyTextInput name='title' placeholder='Post title' />
            <MyTextArea name='description' placeholder='Description' rows={3} />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
