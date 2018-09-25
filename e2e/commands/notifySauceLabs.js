/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const SauceLabs = require('saucelabs');

exports.command = function (callback) {
  if (process.env.BUILDKITE_BRANCH !== 'master') {
    return callback();
  }
  const saucelabs = new SauceLabs({
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_ACCESS_KEY,
  });

  const sessionId = this.capabilities['webdriver.remote.sessionid'];
  const name = this.currentTest.name;
  const passed = this.currentTest.results.testcases[name].failed === 0;

  saucelabs.updateJob(
    sessionId,
    {
      passed,
      name,
    },
    callback,
  );
};
