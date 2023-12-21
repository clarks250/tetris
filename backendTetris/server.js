const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const userRouter = require('./routes/user.routes');
const exp = require('constants');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
const SCORES_FILE_PATH = 'data/scores.json';

app.set('views', __dirname + 'views')
app.set('wiev engien', 'ejs')

app.use(express.static('FrontEnd'));
app.use(express.json())
app.use('/api', userRouter)

app.get("/tetrus", function(req, res){
        
  res.sendFile(__dirname + '/FrontEnd/index.html')
  console.log(__dirname + '/FrontEnd/index.html')
});

app.get("/form", function(req, res){
        
  res.sendFile(__dirname + '/FrontEnd/form.html')
  console.log(__dirname + '/FrontEnd/form.html')
});


app.get("/", function(req, res){
        
  res.render(__dirname + 'index', {title: 'asdas'})

  // res.sendFile(__dirname + '/FrontEnd/index.html')
  console.log(__dirname + 'index')
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
