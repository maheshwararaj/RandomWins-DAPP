const WebSocket = require('ws');
const {gameResult}=require('./ether');
// const {gameEnd}=require('./result');


// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];
let gameActive = false;
let gameStartTime = null;
const gameDuration = 1 * 60 * 1000;  // 10 minutes in milliseconds
// let gameChoices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'];  // The four possible choices

// When a new client connects

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);

  const timeLeft = Math.max(0, gameStartTime + gameDuration - Date.now());
  ws.send(JSON.stringify({ type:"gamestate", isGameActive : gameActive }));
 

  // Handle client's choice
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'make-choice' && gameActive && data.choice >= 0 && data.choice < gameChoices.length) {
      console.log(`Client made choice: ${gameChoices[data.choice]}`);
      ws.send(JSON.stringify({ type: 'confirmation', choice: data.choice, message: 'Your choice has been recorded.' }));
    }
  });

  // Remove client on disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== ws);
  });


});

// Start a new game every 10 minutes
function startNewGame() {
  if (gameActive) {
    console.log('A game is already active, skipping start.');
    return;
  }

  console.log('Starting a new game');
  gameActive = true;
  gameStartTime = Date.now();

  // Broadcast game start message to all clients
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        isGameActive:gameActive,
        type: 'gamestate',
        timeLeft: gameDuration / 1000,  // in seconds
        
      }));
    }
  });

  // Broadcast the remaining time for the game every second
  const interval = setInterval(() => {
    const timeLeft = Math.max(0, gameStartTime + gameDuration - Date.now());
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'time-left', timeLeft: timeLeft / 1000 }));
      }
    });

    // End the game when time is up
    if (timeLeft <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

// End the current game
async function endGame() {
  console.log('Ending the game');
  gameActive = false;

  // Broadcast game over message
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'gamestate', isGameActive:gameActive, message: 'The game has ended.' }));
    }
  });
  await gameResult();


  // Start a new game after a delay (e.g., 5 seconds after the game ends)
  setTimeout(() => {
    startNewGame();
  }, 5000);
}

// Start the first game when the server starts
startNewGame();
