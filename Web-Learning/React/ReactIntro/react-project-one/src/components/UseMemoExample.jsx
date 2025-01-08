import { useState, useMemo } from "react";

// Heavy computation function
const calculateFactorial = (number) => {
  console.log("Calculating factorial...");
  if (number <= 0) return 1;
  return number * calculateFactorial(number - 1);
};

const UseMemoExample = () => {
  const [number, setNumber] = useState(1);
  const [counter, setCounter] = useState(0);

  // Use useMemo to memoize the result of calculateFactorial
  const factorial = useMemo(() => calculateFactorial(number), [number]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>useMemo Example</h2>
      <div>
        <label>
          Enter a number:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value, 10))}
            min="0"
          />
        </label>
      </div>
      <h3>Factorial: {factorial}</h3>
      <div>
        <button onClick={() => setCounter(counter + 1)}>
          Increment Counter
        </button>
        <p>Counter: {counter}</p>
      </div>
      <p>
        Notice how the factorial calculation only happens when the number
        changes, not when the counter is updated.
      </p>
    </div>
  );
};

export default UseMemoExample;