import { useState } from 'react';

const RandomNumberGenerator = () => {
  const [number, setNumber] = useState(null);

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    setNumber(randomNum);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Random Number Generator</h2>
      <p>{number !== null ? `Generated Number: ${number}` : 'Click the button to generate a number!'}</p>
      <button onClick={generateRandomNumber} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Generate Random Number
      </button>
    </div>
  );
};

export default RandomNumberGenerator;