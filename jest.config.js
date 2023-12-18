module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageReporters: ['text'],
  testPathIgnorePatterns: ['<rootDir>/src/domain/ports/', '<rootDir>/src/domain/errors/'],
}