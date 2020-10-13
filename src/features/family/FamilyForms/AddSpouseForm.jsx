import React from 'react';
import { Button, Modal, Segment, Icon, Header } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';

export default function AddSpouseForm() {
  // const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const { selectedPerson } = useSelector((state) => state.family);

  const initialValues = selectedPerson ?? {
    title: '',
    category: '',
    description: '',
  };

  return (
    <>
      <Modal
        closeIcon
        open={open}
        trigger={
          <Button
            content='Add Spouse!'
            labelPosition='right'
            icon='heart'
            onClick={() => console.log('clicked')}
            primary
          />
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <Segment clearing>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => console.log(values)}
            >
              {({ isSubmitting, dirty, isValid, values }) => (
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
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
