/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {resolve} = require('path');

const jar = require('selenium-server-standalone-jar');
const JOB_IDENTIFIER = process.env.BUILDKITE_BUILD_NUMBER;

const buildSettings = {
  'tunnel-identifier': JOB_IDENTIFIER,
  // sauce lab does not support the concept of branches, so only reporting the master results
  build: process.env.BUILDKITE_BRANCH === 'master' ? JOB_IDENTIFIER : undefined,
};

const environments = {
  'chrome-mac': {
    desiredCapabilities: {
      browserName: 'chrome',
      platform: 'macOS 10.12',
      extendedDebugging: true,
      ...buildSettings,
    },
  },

  'chrome-windows': {
    desiredCapabilities: {
      browserName: 'chrome',
      platform: 'Windows 10',
      ...buildSettings,
    },
  },

  'iPhone-X': {
    desiredCapabilities: {
      browserName: 'Safari',
      deviceName: 'iPhone X Simulator',
      deviceOrientation: 'portrait',
      platformVersion: '11.0',
      platformName: 'iOS',
      ...buildSettings,
    },
  },
};

const sauceLabsBaseConfig = {
  launch_url: process.env.E2E_LAUNCH_URL || 'http://localhost:8080',
  selenium_port: 80,
  selenium_host: 'ondemand.saucelabs.com',
  silent: true,
  username: '${SAUCE_USERNAME}',
  access_key: '${SAUCE_ACCESS_KEY}',
  globals: {
    waitForConditionTimeout: 10000,
    visual_regression_settings: {
      prompt: !!process.env.VRT_OVERRIDE,
    },
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
  custom_assertions_path: [
    resolve(__dirname, 'e2e/assertions'),
    resolve(__dirname, 'node_modules/nightwatch-accessibility/assertions'),
    resolve(__dirname, 'node_modules/@gergelyke/nightwatch-vrt/assertions'),
  ],
  custom_commands_path: [
    resolve(__dirname, 'e2e/commands'),
    resolve(__dirname, 'node_modules/nightwatch-accessibility/commands'),
    resolve(__dirname, 'node_modules/@gergelyke/nightwatch-vrt/commands'),
  ],

  selenium: {
    start_process: process.env.SAUCE_USERNAME ? false : true,
    server_path: jar.path,
    port: 4444,
  },

  test_settings: {
    default: {
      launch_url: process.env.E2E_LAUNCH_URL || 'http://localhost:8080',
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
