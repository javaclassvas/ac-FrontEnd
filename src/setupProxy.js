const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("dotenv").config();
const {
  parsed: { BACKEND_URL }
} = config;

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: BACKEND_URL
    })
  );
  const wsProxy = createProxyMiddleware("/socket.io", {
    target: BACKEND_URL,
    changeOrigin: true,
    ws: true
  });
  app.use(wsProxy);
};
