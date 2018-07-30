// @flow

/*globals __dirname*/
/* eslint-disable no-console */

const connect = require('connect');
const serveStatic = require('serve-static');
const {join} = require('path');

connect()
  .use(serveStatic(join(__dirname, 'dist')))
  .listen(8080, function() {
    console.log('listening');
  });
