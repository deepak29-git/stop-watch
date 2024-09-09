// src/Stopwatch.js
import React, { useState, useEffect } from 'react';
import '../components/Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const milliseconds = ('0' + ((time / 10) % 100)).slice(-2);
    const seconds = ('0' + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ('0' + (Math.floor(time / 60000) % 60)).slice(-2);

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="container">
      <h2 className="title">Stopwatch</h2>
      <div className="time-display">{formatTime(time)}</div>
      <button
        onClick={handleStartPause}
        className={`button ${isRunning ? 'button-pause' : 'button-start'}`}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleStop} className="button button-stop">
        Stop
      </button>
      <button onClick={handleReset} className="button button-reset">
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
