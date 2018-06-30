// @flow
module.exports = {
  rootDir: 'src',
  setupFiles: [
    '<rootDir>/utils/test-setup.js',
    '<rootDir>/utils/e2e-test-setup.js',
  ],
  testMatch: [/e2e.js/],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
