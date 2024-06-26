/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['./tests/dbSetup/jest.setup.ts'],
  globalSetup: './tests/dbSetup/jest.global-setup.ts',
  globalTeardown: './tests/dbSetup/jest.global-teardown.ts',
};
