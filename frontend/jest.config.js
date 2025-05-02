// frontend/src/jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
    '^sweetalert2$': '<rootDir>/src/__mocks__/sweetalert2.js',
    '^sweetalert2-react-content$': '<rootDir>/src/__mocks__/sweetalert2-react-content.js',
    '^react-router-dom$': '<rootDir>/src/__mocks__/react-router-dom.js'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};