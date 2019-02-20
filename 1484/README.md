
## Steps to reproduce

1. cd into this directory
1. run `make | tee run.log`
1. run `touch server.js`

### Actual result

The following error

```
events.js:167
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1328:14)
    at listenInCluster (net.js:1376:12)
    at Server.listen (net.js:1463:7)
    at Function.listen (/opt/code/node_modules/express/lib/application.js:618:24)
    at Object.<anonymous> (/opt/code/server.js:82:5)
    at Module._compile (internal/modules/cjs/loader.js:702:30)
    at loader (/opt/code/node_modules/babel-register/lib/node.js:144:5)
    at Object.require.extensions.(anonymous function) [as .js] (/opt/code/node_modules/babel-register/lib/node.js:154:7)
    at Module.load (internal/modules/cjs/loader.js:612:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
Emitted 'error' event at:
    at emitErrorNT (net.js:1355:8)
    at process._tickCallback (internal/process/next_tick.js:63:19)
    at Function.Module.runMain (internal/modules/cjs/loader.js:746:11)
    at Object.<anonymous> (/opt/code/node_modules/babel-cli/lib/_babel-node.js:154:22)
    at Module._compile (internal/modules/cjs/loader.js:702:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
    at Module.load (internal/modules/cjs/loader.js:612:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
    at Function.Module._load (internal/modules/cjs/loader.js:543:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
[nodemon] app crashed - waiting for file changes before starting...
```

### Expected result

Clean restart of app
