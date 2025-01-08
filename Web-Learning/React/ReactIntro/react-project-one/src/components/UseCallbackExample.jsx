import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Separate ChildComponent defined outside the parent
const ChildComponent = React.memo(function Child({ onButtonClick }) {
  console.log('ChildComponent re-rendered');
  return (
    <button onClick={onButtonClick}>
      Increment Counter
    </button>
  );
});

ChildComponent.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
}

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Memoize the event handler to avoid unnecessary re-renders
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <ChildComponent onButtonClick={handleIncrement} />
      <button onClick={() => setOtherState((prev) => !prev)}>
        Toggle Other State
      </button>
      <p>Other State: {otherState.toString()}</p>
    </div>
  );
};

export default UseCallbackExample;