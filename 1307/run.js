var spawn = require('child_process').spawn;
var start = spawn('ls');
start.on('close', function(data) {
  if (data === 0) {
    var compile = spawn('g++', ['run.cpp', '-o', 'run']);
    compile.stdout.on('data', data => {});
    compile.stderr.on('data', data => {
      console.log(String(data));
    });
    compile.on('close', output => {
      console.log('Compilation done. Exited with code ' + output);
      var run = spawn('./run.exe', []);
      run.stdout.on('data', output => {
        console.log(String(output));
      });
      run.stderr.on('data', output => {
        console.log(String(output));
      });
      run.on('close', output => {
        console.log('Execution done. Exited with code ' + output);
      });
    });
  }
});
