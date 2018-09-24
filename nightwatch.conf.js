/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const jar = require('selenium-server-standalone-jar');
const JOB_IDENTIFIER = process.env.BUILDKITE_BUILD_NUMBER;

const environments = {
  'chrome-mac': {
    desiredCapabilities: {
      browserName: 'chrome',
      platform: 'macOS 10.12',
      extendedDebugging: true,
      'tunnel-identifier': JOB_IDENTIFIER,
    },
  },

  'chrome-windows': {
    desiredCapabilities: {
      browserName: 'chrome',
      platform: 'Windows 10',
      'tunnel-identifier': JOB_IDENTIFIER,
    },
  },

  'iPhone-X': {
    desiredCapabilities: {
      browserName: 'Safari',
      deviceName: 'iPhone X Simulator',
      deviceOrientation: 'portrait',
      platformVersion: '11.0',
      platformName: 'iOS',
      'tunnel-identifier': JOB_IDENTIFIER,
    },
  },
};

const sauceLabsBaseConfig = {
  launch_url: 'http://ondemand.saucelabs.com:8080',
  selenium_port: 80,
  selenium_host: 'ondemand.saucelabs.com',
  silent: true,
  username: '${SAUCE_USERNAME}',
  access_key: '${SAUCE_ACCESS_KEY}',
  globals: {
    waitForConditionTimeout: 10000,
  },
  desiredCapabilities: {
    'tunnel-identifier': JOB_IDENTIFIER,
  },
};

const sauceLabsEnvironments = Object.keys(environments).reduce(
  (accumulator, current) => {
    return Object.assign(accumulator, {
      [current]: {
        ...sauceLabsBaseConfig,
        ...environments[current],
      },
    });
  },
  {},
);

module.exports = {
  src_folders: ['src'],
  output_folder: 'reports',
  custom_assertions_path: 'e2e/assertions',

  selenium: {
    start_process: process.env.SAUCE_USERNAME ? false : true,
    server_path: jar.path,
    port: 4444,
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:8080',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    ...sauceLabsEnvironments,
  },
};
