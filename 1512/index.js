const port = process.env.PORT;
require('http').createServer((req, res) => res.end('ok')).listen(port);

delete process.env.PORT;

