import { useState, useEffect } from "react";

function LifecycleDemo() {
  // State to store count
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Mimics componentDidMount and componentDidUpdate
  useEffect(() => {
    console.log("Component mounted or updated");

    // Optional: Cleanup to mimic componentWillUnmount
    return () => {
      console.log("Cleanup before next render or unmount");
    };
  }, [count]); // Only runs when `count` changes

  // Mimics componentDidMount
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component will unmount");
    };
  }, []); // Empty dependency array runs only once

  return (
    <div>
      <h1>React Lifecycle Methods with Hooks</h1>
      {isVisible && (
        <>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
      )}
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Visibility
      </button>
    </div>
  );
}

export default LifecycleDemo