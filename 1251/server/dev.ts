import { createReadStream } from 'fs'
import * as http from 'http'

const server = http.createServer((req, res) => res.end("ok"));

server.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${server.address().port}`)
})
