process.once('SIGUSR2', graceful_shutdown)
process.once('SIGTERM', graceful_shutdown)

console.log('Listening to process signals.')

// Don't clean exit.
setInterval(() => {}, 10000)

function graceful_shutdown() {
  console.log('Detected shutdown / restart.')
  process.exit(0)
}
