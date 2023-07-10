// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
   // '/performances/PF217683',
   '/api',
    createProxyMiddleware({
      target: 'http://52.79.149.51:8080',
      changeOrigin: true,
    })
  );
};