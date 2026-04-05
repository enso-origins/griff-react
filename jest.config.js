module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(d3|d3-.+|internmap|delaunator|robust-predicates|react-resize-detector)/)',
  ],
  testRegex: '(/.*(\\.|/)(test|spec))\\.(tsx|ts|js)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json', 'node'],
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$':
      '<rootDir>/node_modules/jest-css-modules-transform',
  },
  modulePaths: ['<rootDir>/src'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};
