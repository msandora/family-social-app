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

// graphql stuff 
import { useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  FETCH_POST_QUERY,
  FETCH_POSTS_QUERY,
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION } from '../../../utils/graqphql'
import firebase from '../../../app/config/firebase';

const defaultImg = "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"

export default function ScreamForm({ match, history, location }) {

    // graphql query for fetching post from mongodb 
    const { loading, error, data:{ getPost: post }} = useQuery(FETCH_POST_QUERY, {
      variables: { postId: match.params.id },
    });
    // console.log({post})
  
  const dispatch = useDispatch();
  const { selectedScream, imgUrlList } = useSelector((state) => state.scream);
  console.log({imgUrlList})
  // const { loading, error } = useSelector((state) => state.async);
  const [valuesState, setvaluesState] = useState({});

  const user = firebase.auth().currentUser;
  console.log({user})
  const [createPost,] = useMutation(CREATE_POST_MUTATION);
  const [updatePost,] = useMutation(UPDATE_POST_MUTATION);

  // console.log({selectedScream})
  // console.log({imgUrlList})
  useEffect(() => {
    if (location.pathname !== '/createScream') return;
    dispatch(clearSelectedScream());
  }, [dispatch, location.pathname]);

  // const initialValues = selectedScream ?? {
  const initialValues = post ?? {
    title: '',
    description: '',
    screamImages: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    description: Yup.string().required(),
    screamImages: Yup.array().of(
      Yup.string().required('You must provide a image')
    ),
  });

  // useFirestoreDoc({
  //   shouldExecute:
  //     match.params.id !== selectedScream?.id &&
  //     location.pathname !== '/createScream',
  //   // query: () => listenToScreamFromFirestore(match.params.id), 
  //   // data: (scream) => dispatch(listenToSelectedScream(scream)),  
  //   deps: [match.params.id, dispatch],
  // });

  if (loading) return <LoadingComponent content='Loading scream...' />;

  if (error) return <Redirect to='/error' />;
  // console.log(selectedScream.id);
  const deleteImg = (imgIndex, images) => {
    return images.splice(imgIndex, 1);
    // imgUrlList.splice(imgIndex, 1)
    console.log('screamImages', imgUrlList);
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
            !match.params.id
            ? await createPost(
              { variables: {
                postInput: {...values,photos:[...post.photos,...imgUrlList] ,hostUid: user?.uid,
                  hostedBy: user?.displayName,
                  hostPhotoURL: user?.photoURL || defaultImg,},
              },
              update(proxy, result) {
                const data = proxy.readQuery({
                  query: FETCH_POSTS_QUERY
                });
                data.getPosts = [result.data.createPost, ...data.getPosts];
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
              }
            })
            : await updatePost(
              { variables: 
              {...values,photos:[...post.photos,...imgUrlList] ,hostUid: user?.uid,
              hostedBy: user?.displayName,
              hostPhotoURL: user?.photoURL || defaultImg,
              postId:match.params.id,
            },
              update(proxy, result) {
                const data = proxy.readQuery({
                  query: FETCH_POSTS_QUERY
                });
                data.getPosts = [result.data.createPost, ...data.getPosts];
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
              } });
            // selectedScream
            //   ?  dispatch(updateScreamInFirestore(values, imgUrlList && imgUrlList ))
            //   :  dispatch(addScreamToFirestore(values, imgUrlList && imgUrlList))
            setSubmitting(false);
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
            {
              post.photos &&
              post.photos.map((img, index) => (
                <Link onClick={() => deleteImg(index, post.photos)}>
                  {' '}
                  <img
                    src={img}
                    alt='img'
                    style={{
                      width: '6rem',
                      height: '6rem',
                      margin: 5,
                      border: '1px solid lightgrey',
                    }}
                  />{' '}
                </Link>
              ))}
            {imgUrlList &&
              imgUrlList.length > 0 &&
              imgUrlList.map((img, index) => (
                <Link onClick={() => deleteImg(img, imgUrlList, index)}>
                  {' '}
                  <img
                    src={img}
                    alt='img'
                    style={{
                      width: '6rem',
                      height: '6rem',
                      margin: 5,
                      border: '1px solid lightgrey',
                    }}
                  />{' '}
                </Link>
              ))}

            <Form className='ui form'>
              <Header sub color='teal' content='Post Details' />
              <MyTextInput name='title' placeholder='Post title' />
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
