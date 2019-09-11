const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/api', {
      target: 'http://localhost:5000/',
      changeOrigin: true
    })
  );
  process.env.NODE_ENV === 'development' &&
    app.use(
      proxy('/socket.io', {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        ws: true
      })
    );
};
