import { useState } from "react";

const InputHandler = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function OnInputValueChange(e) {
    setInputValue(e.target.value);
    setIsSubmitted(false);
  }

  function Submit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={OnInputValueChange}
        />
        <button type="submit" disabled={!inputValue} style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
      </form>

      {isSubmitted && <p>You Entered Your Name is: {inputValue}</p>}
    </div>
  );
};

export default InputHandler;