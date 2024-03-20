const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

// Store game state
let gameState = {
  player1Coord: { top: 0, bottom: 0 },
  player2Coord: { top: 0, bottom: 0 },
  ballCoord: { top: 0, left: 0 },
  score1: 0,
  score2: 0,
};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send current game state to the newly connected client
  socket.emit('initialState', gameState);

  // Listen for updates from clients and broadcast to others
  socket.on('updateState', (updatedState) => {
    gameState = updatedState;
    socket.broadcast.emit('updateState', gameState);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
