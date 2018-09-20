// @flow
/*global module*/

module.exports = {
  rootDir: 'src',
  setupTestFrameworkScriptFile: '<rootDir>/e2e-test.setup.js',
  testMatch: ['**/e2e.js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
