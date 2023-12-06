const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
const SCORES_FILE_PATH = 'data/scores.json';

let userScores;

app.use(express.static("FrontEnd"));

function loadScores() {
  try {
    const data = fs.readFileSync(SCORES_FILE_PATH, 'utf8');
    return JSON.parse(data) || userScores || {};
  } catch (error) {
    if (error.code === 'ENOENT') {
      saveScores({});
      return userScores || {};
    } else {
      console.error(`Ошибка при загрузке счетов: ${error.message}`);
      return userScores || {};
    }
  }
}

function saveScores() {
  try {
    if (userScores) {
      fs.writeFileSync(SCORES_FILE_PATH, JSON.stringify(userScores, null, 2), 'utf8');
      console.log('Счета сохранены в файл');
    }
  } catch (error) {
    console.error(`Ошибка при сохранении счетов: ${error.message}`);
  }
}

userScores = loadScores();

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });

  socket.on('updateScore', (score) => {
    const userId = socket.id;

    if (!userScores) {
      userScores = loadScores();
    }

    userScores[userId] = score;

    saveScores();

    console.log(`Счет пользователя ${userId} обновлен: ${score}`);
  });

});

app.get('/scores', (req, res) => {
  const scores = loadScores();
  res.json(scores);
});

app.get("/tetrus", function(req, res){
        
  res.sendFile(__dirname + '/FrontEnd/index.html')
  console.log(__dirname + '/FrontEnd/index.html')
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
