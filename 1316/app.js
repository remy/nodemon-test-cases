require('./dummy.js');
require('express')().listen(3000);

process.on('SIGUSR2', () => {
  console.log('nope');
});
