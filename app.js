const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const { BACKEND_URL } = process.env;
const setupProxy = require("./src/setupProxy");

const express = require('express');
const http = require('http');
const path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.all('/login', function(req, res) {
  res.redirect("/");
});
setupProxy(app)
const port = process.env.PORT || '8080';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
