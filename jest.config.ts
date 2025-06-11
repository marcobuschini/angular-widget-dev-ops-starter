export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/html-comment',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/no-ng-attributes',
  ],
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
  roots: ['<rootDir>/projects/widget'],
  transform: {
    //'^.+\\.tsx?$': 'jest-preset-angular',
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)',
    'node_modules/(?!.*\\.mjs$)',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'html',
    ',mjs',
    'node',
    'svg',
  ],
}
