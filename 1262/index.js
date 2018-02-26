const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (...args) => {
  console.log(args);
  const [ fn ] = args;
  fn();
  console.log('an event occurred!');
});

let prevent = false;

myEmitter.emit('event', (v = true) => prevent = v);

console.log('prevent: %s', prevent);
