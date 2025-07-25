/** @type {import('jest').Config} */
const config = {
  transform: {
    '^.+\\.(js|jsx)$': [
      'babel-jest',
      { configFile: './babel.config.mjs', },
    ],
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|less|png|jpg|jpeg|gif|svg|ttf|eot)$': 'jest-transform-stub',
  },
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

export default config;
