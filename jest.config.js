module.exports = {
  rootDir: 'src',
  setupFiles: ['<rootDir>/utils/test-setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
