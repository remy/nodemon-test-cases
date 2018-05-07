const nodemon = require('nodemon');

// index.js
process.argv[2] === 'monitor'
  ? nodemon({
      args: process.argv.slice(3),
      verbose: true,
    }).on('log', ({ type, colour }) => {
      console.log(colour);
    })
  : require('./http');
