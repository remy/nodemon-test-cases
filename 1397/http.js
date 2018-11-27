require('http').createServer((req, res) => { res.end('ok'); throw new Error('fail');}).listen(8000);

