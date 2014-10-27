qfail
=====

Automate async error handling in HTTP request handlers.

Install
-------

It's just an npm package, so use npm.

```bash
$ npm install --save qfail
```

Usage
-----

qfail provides a function for wrapping existing request handlers (like connect
middleware, or the connect/express apps themselves) inside 'domains' for
uniformly handling unexpected errors on a per-request basis. It also performs
finalhandler-style error handling by default and provides an interface for
closing the HTTP server and disconnecting the cluster-worker when an error
occurs (for use in clusters with fault-tolerance).

```javascript
var qfail = require('qfail');
var http = require('http');

var server = http.createServer(qfail(myHandler));

server.listen(8000);

function myHandler(req, res) {
  throw new Error('I get caught by the handler domain');
}
```
