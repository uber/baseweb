const jar = require('selenium-server-standalone-jar');

module.exports = {
  src_folders: ['src'],
  output_folder: 'reports',
  custom_assertions_path: 'e2e/assertions',

  selenium: {
    start_process: true,
    server_path: jar.path,
    port: 4444,
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:9080',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },
};
