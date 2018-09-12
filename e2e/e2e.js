// @flow
/* eslint-env node */
/* eslint-disable no-console */
const {spawn} = require('child_process');
const build = spawn('yarn', ['build-e2e']);

build.stdout.on('data', data => {
  console.log(`build stdout:\n${data}`);
});

build.stderr.on('data', data => {
  console.error(`build stderr:\n${data}`);
});

build.on('exit', function() {
  const serve = spawn('yarn', ['e2e:serve']);

  serve.stdout.on('data', data => {
    console.log(`serve stdout:\n${data}`);

    if (String(data).includes('listening')) {
      const test = spawn('yarn', ['e2e:test']);

      test.stdout.on('data', data => {
        console.log(`test stdout:\n${data}`);
      });

      test.stderr.on('data', data => {
        console.error(`test stderr:\n${data}`);
      });

      test.on('exit', code => {
        serve.kill();
        process.exit(code);
      });
    }
  });

  serve.stderr.on('data', data => {
    console.error(`serve stderr:\n${data}`);
  });
});
