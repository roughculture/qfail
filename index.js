'use strict';

var domain = require('domain');

module.exports = function(handler, options) {
  options = options || {};

  options.logerror = options.logerror || function() {};

  return function qfailHandler(req, res) {
    var dmn = domain.create();

    dmn.add(req);
    dmn.add(res);

    dmn.on('error', function(err) {
      options.logerror(err);

      try {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500 Internal Server Error');
      } catch (err2) {
        console.error('error sending 500: ', err2.stack || '' + err2);
      }
    });
  };
};
