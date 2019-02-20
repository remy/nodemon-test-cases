require('http')
  .createServer((req, res) => res.end('ok'))
  .listen(8000, () => {
    console.log('Starting app on 8000');
  });