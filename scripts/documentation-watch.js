const nodemon = require('nodemon');

nodemon('--watch src --exec yarn documentation:dev').on('restart', files => {
  console.log(__dirname);
  console.log('files', files);
});
