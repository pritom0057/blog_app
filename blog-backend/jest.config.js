module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'], // Adjust to match your test files
  moduleFileExtensions: ['ts', 'js'], // Allows Jest to recognize TypeScript files
};