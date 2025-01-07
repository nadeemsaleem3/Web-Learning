import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TimeoutResetComponent = ({ timeout = 5000, initialValue }) => {
  // Define the state using the initial value
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Set a timeout to reset the state after the specified timeout
    const timer = setTimeout(() => {
      setState(initialValue);
    }, timeout);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, [initialValue, timeout]);

  // Update the state when a user interacts with the component
  const handleChange = (newState) => {
    setState(newState);
  };

  return (
    <div>
      <p>Current State: {state}</p>
      <button onClick={() => handleChange("New State")}>Change State</button>
    </div>
  );
};

TimeoutResetComponent.propTypes = {
    timeout: PropTypes.number.isRequired,
    initialValue: PropTypes.string.isRequired,
}

export default TimeoutResetComponent;