import React, {useState} from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToSelectedRecipe, clearSelectedRecipe } from '../recipeActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { recipeCategories } from '../../../app/api/recipeCategories';

import {
  listenToRecipeFromFirestore,
  updateRecipeInFirestore,
  addRecipeToFirestore,
} from '../../../app/firestore/firestoreServices/firestoreRecipesHandler';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

// graphql stuff 
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {CREATE_RECIPE_MUTATION,UPDATE_RECIPE_MUTATION,FETCH_RECIPE_QUERY } from '../../../utils/graqphql'
import firebase from '../../../app/config/firebase';

const defaultImg = "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"

export default function RecipeForm({ match, history, location }) {
  // graphql query for fetching recipe from mongodb 
    // const { loading, error, data:{ getRecipe: recipe }} = useQuery(FETCH_RECIPE_QUERY, {
    //     variables: { recipeId: match.params.id || ""},
    //   });
    //   console.log({recipe})

  const user = firebase.auth().currentUser;
  console.log({user})
  const [createRecipe,] = useMutation(CREATE_RECIPE_MUTATION);
  const [updateRecipe,] = useMutation(UPDATE_RECIPE_MUTATION);

  const dispatch = useDispatch();
  const { selectedRecipe } = useSelector((state) => state.recipe);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== '/createRecipe') return;
    dispatch(clearSelectedRecipe());
  }, [dispatch, location.pathname]);

  const initialValues = selectedRecipe ?? {
    title: '',
    category: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
  });

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedRecipe?.id &&
      location.pathname !== '/createRecipe',
    query: () => listenToRecipeFromFirestore(match.params.id),
    // query: () => recipe,
    data: (recipe) => dispatch(listenToSelectedRecipe(recipe)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content='Loading recipe...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // selectedRecipe
            !match.params.id
              ? await createRecipe(
                { variables: 
                {...values, hostUid: user?.uid,
                hostedBy: user?.displayName,
                hostPhotoUrl: user?.photoURL || defaultImg} })
              : await updateRecipe(
                { variables: 
                {...values, hostUid: user?.uid,
                hostedBy: user?.displayName,
                hostPhotoUrl: user?.photoURL || defaultImg} });
            setSubmitting(false);
            history.push('/recipes');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Recipe Details' />
            <MyTextInput name='title' placeholder='Recipe title' />
            <MySelectInput
              name='category'
              placeholder='Recipe category'
              options={recipeCategories}
            />
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
