require('http').createServer((req, res) => res.end('ok')).listen(8000);

setTimeout(() => foo(), 200);

