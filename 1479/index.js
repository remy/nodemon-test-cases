const express = require('express');

console.log('a change')

const app = express();

const webPort = 3222;
app.listen(webPort, () => console.log(`App listening on port ${webPort}.`))

module.exports = app;
