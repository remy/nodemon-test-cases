const fs = require('fs');

try {
  fs.mkdirSync('./data');
} catch (err) {
  // already exists...
}

setInterval(() => {
  console.log(Date.now());
  fs.writeFileSync('./data/test.json', JSON.stringify({ timestamp: Date.now() }));
}, 1000)