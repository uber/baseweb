// @flow
/*eslint-env node*/
module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test'],
  rootDir: 'src',
  setupFiles: ['<rootDir>/test/test-setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/test/test-framework-setup.js',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
