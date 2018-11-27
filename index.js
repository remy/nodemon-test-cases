const readline = require('readline');

const ui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'MyShell>'
})
ui.prompt()
