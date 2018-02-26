const express = require('express');
const http = require('http');
const debug = require('util').debuglog('app');
const app = express();
const port = normalizePort(process.env.PORT || '8080');

app.get('/', (req, res) => res.send('ok'));

if (port) {
  const server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  process.on('uncaughtException', () => server.close());
  process.on('SIGTERM', () => server.close());
  process.on('exit', () => server.close());

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind =
      typeof port === 'string' ? `Pipe ${port}` : `Port ${port.toString()}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
    console.log(`Server started on ${bind}`);
  }
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
