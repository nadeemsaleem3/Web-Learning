import { useState } from 'react';

const NumberList = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const handleRemove = (number) => {
    setNumbers(numbers.filter(n => n !== number));
  };

  return (
    <div>
      <h3>Number List</h3>
      <ul>
        {numbers.map((number) => (
          <li key={number} style={{listStyleType: 'none'}}>
            {number} 
            <button onClick={() => handleRemove(number)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberList;