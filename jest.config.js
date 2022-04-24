module.exports = {
  testPathIgnorePattern: ['/node_modules/'],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setupTests.js',
  ],
  testEnvironment: 'jsdom',
};
