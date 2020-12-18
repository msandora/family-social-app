import React, { useState } from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import UnauthModal from '../../auth/UnauthModal';
import {
  addUserAttendance,
  cancelUserAttendance,
  deleteEventInFirestore,
} from '../../../app/firestore/firestoreServices/firestoreEventsHandler';
import MyButton from '../../../app/common/MyButton';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '1%',
  left: '1%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached='top' style={{ padding: '0' }}>
          <Image
            src={`/assets/categoryImages/${event.category}.jpg`}
            fluid
            style={eventImageStyle}
          />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={event.title}
                    style={{ color: 'white' }}
                  />
                  <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                  <p>
                    Hosted by{' '}
                    <strong>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>{' '}
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached='bottom' clearing>
          {!isHost && (
            <>
              {isGoing ? (
                <Button onClick={handleUserLeaveEvent} loading={loading}>
                  Cancel My Place
                </Button>
              ) : (
                <Button
                  onClick={
                    authenticated
                      ? handleUserJoinEvent
                      : () => setModalOpen(true)
                  }
                  loading={loading}
                  color='teal'
                >
                  JOIN THIS EVENT
                </Button>
              )}
            </>
          )}

          {isHost && (
            <>
              <Button
                type='button'
                color='red'
                icon='trash'
                onClick={() => deleteEventInFirestore(event.id)}
                floated='right'
              />
              <Button
                type='button'
                color='teal'
                icon='edit'
                as={Link}
                to={`/manageEvent/${event.id}`}
                floated='right'
              />
            </>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
