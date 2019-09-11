const proxy = require('http-proxy-middleware');

const target =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : 'ws://pokemon-team-planner-ani.herokuapp.com/socket.io/?EIO=4&transport=websocket';

module.exports = app => {
  app.use(
    proxy('/api', {
      target: 'http://localhost:5000/',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/socket.io', {
      target,
      changeOrigin: true,
      ws: true
    })
  );
};
