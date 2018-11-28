const read = require('fs').readFileSync;
const foo = read('./foo.env', 'utf8');
const bar = read('./.env', 'utf8');

console.log('FOO: ' + foo);
console.log('BAR: ' + bar);
