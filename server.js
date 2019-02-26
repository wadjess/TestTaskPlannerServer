const http = require('http');
const app = require('./app');
const port = 27227;
const server =  http.createServer(app);

server.listen(port);