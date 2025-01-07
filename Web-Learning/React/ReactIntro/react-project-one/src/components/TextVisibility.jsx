import { useState } from 'react';

const TextVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
      };

  return (
    <div>
        <button onClick={toggleVisibility} style={{ padding: '10px 20px', fontSize: '16px' }}>
            {isVisible ? 'Hide' : 'Show'} Text
          </button>
          {isVisible && <p>This is the paragraph of text that can be toggled.</p>}
    </div>
  )
}

export default TextVisibility