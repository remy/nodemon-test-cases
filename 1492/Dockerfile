FROM node:slim

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json /usr/app/
RUN npm install

# Bundle app source
COPY . /usr/app

CMD [ "npm", "run", "watch" ]
