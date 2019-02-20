#!/bin/sh

PARENT_ID=$$

background_f() {

  # However long you need for the server to be listening
  for i in {1..8}
  do
    sleep 10
    echo
    echo "## $(( 80 - (i * 10) )) Seconds to 'touch server.js'"
    echo
  done

  echo
  echo "## touch server.js"
  echo
  touch server.js

  # However long it takes to reproduce the issue (or not ):
  for i in {1..2}
  do
    sleep 10
    echo
    echo "## $(( 20 - (i * 10) )) Seconds to 'kill -INT \$PID'"
    echo
  done

  echo "## CTRL+C server (you may have to CTRL+C yourself...)"
  echo
  kill -INT $PARENT_ID || true
}

background_f &
BACKGROUND_ID=$!
echo "subprocess ID $ID"
jobs

make start-docker | tee run.log

kill -INT $BACKGROUND_ID || true
