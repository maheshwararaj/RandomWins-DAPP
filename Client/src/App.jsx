import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [choices, setChoices] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    // Handle WebSocket messages from the server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'game-start') {
        setGameActive(true);
        setChoices(data.choices);
        setTimeLeft(data.timeLeft);
        setMessage('The game has started! Make your choice.');
      } else if (data.type === 'time-left') {
        setTimeLeft(data.timeLeft);
      } else if (data.type === 'game-over') {
        setGameActive(false);
        setMessage(data.message);
      } else if (data.type === 'confirmation') {
        setMessage(`You selected: ${data.choice + 1}. ${data.message}`);
      }
    };

    // Handle WebSocket connection open
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // Handle WebSocket error
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // Handle making a choice
  const makeChoice = (choice) => {
    if (gameActive && choice >= 0 && choice < choices.length) {
      setSelectedChoice(choice);
      const ws = new WebSocket('ws://localhost:8080');
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'make-choice', choice }));
      };
    }
  };

  return (
    <div className="App">
      <h1>Guessing Game</h1>
      <p>{message}</p>

      {gameActive && (
        <div>
          <p>Time Left: {timeLeft} seconds</p>
          <div>
            {choices.map((choice, index) => (
              <button key={index} onClick={() => makeChoice(index)}>
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      {!gameActive && timeLeft === null && <p>Waiting for the next game to start...</p>}
    </div>
  );
}

export default App;
