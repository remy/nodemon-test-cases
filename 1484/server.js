const express = require('express');
const fs = require('fs');
const path = require('path');
const parse = require('querystring').parse;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');

app.use((req, res, next) => {
  if (req.path === '/.health') {
    next();
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.set('X-Request-Id', req.id);
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Content-Type', 'application/vnd.api+json');

  console.log(req.url);

  next();
});

app.get('/', (req, res) => res.send(''));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
