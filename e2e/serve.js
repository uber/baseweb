// @flow
/*globals __dirname*/
const connect = require('connect');
const serveStatic = require('serve-static');
const {join} = require('path');

connect()
  .use(serveStatic(join(__dirname, 'dist')))
  .listen(8080, function() {});
