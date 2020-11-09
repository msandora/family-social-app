import React, { useState } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToSelectedScream, clearSelectedScream } from '../screamActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Link } from 'react-router-dom';
import {
  listenToScreamFromFirestore,
  updateScreamInFirestore,
  addScreamToFirestore,
} from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import ScreamImageUpload from './ScreamImageUpload';

export default function ScreamForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedScream, imgUrlList } = useSelector((state) => state.scream);
  const { loading, error } = useSelector((state) => state.async);
  const [valuesState, setvaluesState] = useState({});
  // console.log({selectedScream})
  // console.log({imgUrlList})
  useEffect(() => {
    if (location.pathname !== '/createScream') return;
    dispatch(clearSelectedScream());
  }, [dispatch, location.pathname]);

  const initialValues = selectedScream ?? {
    description: '',
    screamImages: '',
  };

  const validationSchema = Yup.object({
    description: Yup.string().required(),
    screamImages: Yup.array().of(
      Yup.string().required('You must provide a image')
    ),
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

  const deleteImg = (imgIndex, images) => {
    return images.splice(imgIndex, 1);
  };

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log({ values });
          setvaluesState(values);
          try {
            selectedScream
              ? await updateScreamInFirestore(values, imgUrlList && imgUrlList)
              : await addScreamToFirestore(values, imgUrlList && imgUrlList);
            setSubmitting(false);
            // history.push('/screams');
            // history.push('/screams');
            window.location.href = 'http://localhost:3000/screams';
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <>
            <ScreamImageUpload
              screamId={selectedScream?.id}
              newScream={selectedScream ? false : true}
              dispatch={dispatch}
            />
            {/* image List  */}
            {selectedScream &&
              selectedScream.screamImages &&
              values &&
              values.screamImages &&
              values.screamImages.map((img, index) => (
                <Link onClick={() => deleteImg(index, values.screamImages)}>
                  <img
                    src={img}
                    alt='img'
                    style={{
                      width: '6rem',
                      height: '6rem',
                      margin: 5,
                      border: '1px solid lightgrey',
                    }}
                  />
                </Link>
              ))}
            {imgUrlList &&
              imgUrlList.length > 0 &&
              imgUrlList.map((img, index) => (
                <Link onClick={() => deleteImg(img, imgUrlList, index)}>
                  <img
                    src={img}
                    alt='img'
                    style={{
                      width: '6rem',
                      height: '6rem',
                      margin: 5,
                      border: '1px solid lightgrey',
                    }}
                  />
                </Link>
              ))}

            <Form className='ui form'>
              <Header sub color='teal' content='Post Details' />
              <MyTextArea
                name='description'
                placeholder='Description'
                rows={3}
              />
              <Button
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                type='submit'
                floated='right'
                positive
                content='Submit'
              />
            </Form>
          </>
        )}
      </Formik>
    </Segment>
  );
}
