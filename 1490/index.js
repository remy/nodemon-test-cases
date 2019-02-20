require('http').createServer((req, res) => res.end('ok')).listen(8000);

setTimeout(() => {
  throw "fail";
}, 50);

