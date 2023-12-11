const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
const SCORES_FILE_PATH = 'data/scores.json';

app.get("/tetrus", function(req, res){
        
  res.sendFile(__dirname + '/FrontEnd/index.html')
  console.log(__dirname + '/FrontEnd/index.html')
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
