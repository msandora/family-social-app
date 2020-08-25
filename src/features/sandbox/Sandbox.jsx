import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);

  return (
    <>
      <h1>Sandbox</h1>
      <h3>The Data is: {data}</h3>
      <Button
        // onClick={() => dispatch({ type: INCREMENT_COUNTER, payload: 10 })}
        onClick={() => dispatch(increment(20))}
        content='Increment'
        color='green'
      />
      <Button
        // onClick={() => dispatch({ type: DECREMENT_COUNTER, payload: 5 })}
        onClick={() => dispatch(decrement(10))}
        content='Decrement'
        color='red'
      />
    </>
  );
}
