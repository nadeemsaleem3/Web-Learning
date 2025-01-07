import { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time by 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startHandler = () => setIsRunning(true);
  const stopHandler = () => setIsRunning(false);
  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Format time in mm:ss:msms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.time}>{formatTime(time)}</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={startHandler} disabled={isRunning}>
          Start
        </button>
        <button style={styles.button} onClick={stopHandler} disabled={!isRunning}>
          Stop
        </button>
        <button style={styles.button} onClick={resetHandler}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  time: {
    fontSize: '48px',
    margin: '20px 0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.2s',
  },
};

export default Stopwatch;