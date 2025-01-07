import { useState, useEffect } from 'react';

const MouseTracker = () => {
  // State to store the mouse coordinates
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to update the mouse position
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Using useEffect to add and clean up the mouse event listener
  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array to ensure it runs only once (on mount and unmount)

  return (
    <div>
      <h2>Mouse Coordinates:</h2>
      <p>X: {mousePosition.x}</p>
      <p>Y: {mousePosition.y}</p>
    </div>
  );
};

export default MouseTracker;