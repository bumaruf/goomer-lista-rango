export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['lcov'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'],
};
