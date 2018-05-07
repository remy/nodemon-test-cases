# nodemon issure 1316

* Install dependency

```javascript
yarn
```

* Run nodemon

```javascript
yarn run mon
```

* Take a look at the running process

```bash
ps | grep 'node'
```

* Kill the parent process of nodemon process

```bash
kill -9 [PPID]
```

* Rerun nodemon

```bash
yarn run mon
```

* Error throws

```error
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::8000
    at Object._errnoException (util.js:1024:11)
    at _exceptionWithHostPort (util.js:1046:20)
    at Server.setupListenHandle [as _listen2] (net.js:1351:14)
    at listenInCluster (net.js:1392:12)
    at Server.listen (net.js:1476:7)
    at Application.listen (/Users/xiadayu/nodemon-issue-1316/node_modules/koa/lib/application.js:64:19)
    at Object.<anonymous> (/Users/xiadayu/nodemon-issue-1316/app.js:8:5)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
[nodemon] app crashed - waiting for file changes before starting...
```