module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/test/assets/'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'tests/results',
        outputName: 'report.xml',
      },
    ],
    [
      'jest-html-reporters',
      {
        pageTitle: 'Test Report',
        filename: 'results.html',
        publicPath: 'tests/results',
      },
    ],
  ],
  coverageReporters: ['lcovonly', 'html', 'text'],
  coverageDirectory: 'tests/coverage',
  transform: {
    '^.+\\.tsx?$': 'jest-preset-angular',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
