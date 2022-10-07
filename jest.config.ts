export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['lcov'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'],
  moduleNameMapper: {
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
  }
};
