import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from '../sandbox/testReducer';
import { openModal } from '../../app/common/modals/modalReducer';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import Example from './examples';
import TestNavigation from './TestNavigation';
import { useMediaQuery } from 'react-responsive';

export default function Sandbox() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <>
      {isDesktopOrLaptop && (
        <>
          <p>You are a desktop or laptop</p>
          {isBigScreen && <p>You also have a huge screen</p>}
          {isTabletOrMobile && (
            <p>You are sized like a tablet or mobile phone though</p>
          )}
        </>
      )}
      {isTabletOrMobileDevice && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
      <TestNavigation />
      <Example />
      <h1>Testing 123</h1>
      <h3>The data is: {data}</h3>
      <Button
        name='increment'
        loading={loading && target === 'increment'}
        onClick={(e) => {
          dispatch(increment(20));
          setTarget(e.target.name);
        }}
        content='Increment'
        color='green'
      />
      <Button
        name='decrement'
        loading={loading && target === 'decrement'}
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name);
        }}
        content='Decrement'
        color='red'
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
        content='Open Modal'
        color='teal'
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </>
  );
}
