const WebSocket = require('ws');
const {gameResult}=require('./ether');
const {gameEnd}=require('./result');
const { getLucky } = require('./server');


// Create a WebSocket server on port 8090
const wss = new WebSocket.Server({ port: 8090 });

let clients = [];
let lucky = 0;
let gameActive = false;
let gameStartTime = null;
const gameDuration = 1 * 60 * 1000;  // 1 minute in milliseconds

// When a new client connects
wss.on('connection', (ws) => {

  console.log('New client connected');
  clients.push(ws);
  ws.send(JSON.stringify({ type:"gameState", isGameActive : gameActive }));

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
        type: 'gameStart',
        message:"The game has started"
      }));
    }
  });

  // Broadcast the remaining time for the game every second
  const interval = setInterval(() => {
    const timeLeft = Math.max(0, gameStartTime + gameDuration - Date.now());
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'timeLeft', timeLeft: timeLeft / 1000 }));
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
      client.send(JSON.stringify({ type: 'gamestate',  message: 'The game has ended.' }));
    }
  });

  await gameResult();
  
   setTimeout(()=>{
    lucky = getLucky()
    clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN){
      client.send(JSON.stringify({type:'result',lucky:lucky}))
    }
  })
  },5000);
 
  
  


  // Start a new game after a delay (e.g., 5 seconds after the game ends)
  setTimeout(() => {
    startNewGame();
  }, 10000);
}

// Start the first game when the server starts
startNewGame();

