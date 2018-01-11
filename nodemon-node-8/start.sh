docker build -t nodemon-node-4 .
docker run --mount type=bind,source=/Users/remy/Sites/nodemon,target=/src/node_modules/nodemon --name nodemon-node-4 --rm -it nodemon-node-4 bash

# node /nodemon-src/bin/nodemon.js -V http.js
