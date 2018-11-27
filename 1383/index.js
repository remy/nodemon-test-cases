const nodemon = require('nodemon');
const spawn = require('child_process').spawn;

nodemon({
  script: 'http.js',
  ext: 'json',
  ignore: ['.git', 'node_modules/**/node_modules'],
  watch: ['./watch'],
}).on('restart', files => {
  console.log(files.length, files);
  /// process files
});

setInterval(() => {
  console.log('touching data file');
  spawn('touch', ['./watch/data.json']);
}, 1000);
