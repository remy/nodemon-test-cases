#
# Ubuntu Node.js Dockerfile
#
# https://github.com/dockerfile/ubuntu/blob/master/Dockerfile
# https://docs.docker.com/examples/nodejs_web_app/
#

# Pull base image.
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Install Node.js
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install --yes nodejs build-essential

WORKDIR /src

COPY . .

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["node", "/nodemon-src/bin/nodemon.js", "-V", "http.js"]
