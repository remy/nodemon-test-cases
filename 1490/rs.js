process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
  const str = data
    .toString()
    .trim()
    .toLowerCase();
  // if the keys entered match the restartable value, then restart!
  console.log('>>> ' + str);
});

process.stdin.pipe(process.stdout);

setTimeout(() => {
  process.stdin.resume();
  console.log('ready');
}, 100);
