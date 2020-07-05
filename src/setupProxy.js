const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const { BACKEND_URL } = process.env;

// для проксирования запросов на бэк обход CORS

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: BACKEND_URL,
      changeOrigin: true,
      secure: false
    })
  );
  const wsProxy = createProxyMiddleware("/socket.io", {
    target: BACKEND_URL,
    changeOrigin: true,
    secure: false,
    ws: true
  });
  app.use(wsProxy);
};
