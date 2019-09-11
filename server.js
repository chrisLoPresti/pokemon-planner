const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const pokemon = require('./routes/api/pokemon');
const abilities = require('./routes/api/abilities');
const moves = require('./routes/api/moves');

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/pokemon', pokemon);
app.use('/api/abilities', abilities);
app.use('/api/moves', moves);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const dataBase = require('./config/keys').mongoURI;
mongoose
  .connect(dataBase, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const server = http.createServer(app);
const io = socketIo.listen(server);

let connectedUsers = 0;
io.on('connection', socket => {
  console.log('=====', 'connected socket', '====');

  ++connectedUsers;
  io.emit('SUBSCRIBE_T0_USER_COUNT', connectedUsers);

  socket.on('disconnect', () => {
    --connectedUsers;
    io.emit('SUBSCRIBE_T0_USER_COUNT', connectedUsers);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
