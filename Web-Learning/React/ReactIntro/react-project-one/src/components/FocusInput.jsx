import { useRef } from "react";

function FocusInput() {
  // Create a ref to store a reference to the input element
  const inputRef = useRef(null);

  // Function to handle focusing the input field
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <h2>Focus Input Example</h2>
      {/* Attach the ref to the input element */}
      <input ref={inputRef} type="text" placeholder="Type something here..." />
      <br />
      {/* Button to trigger the focus function */}
      <button onClick={handleFocus}>Focus the Input</button>
    </div>
  );
}

export default FocusInput;