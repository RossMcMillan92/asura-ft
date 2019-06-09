module.exports = {
  clearMocks: false,
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['<rootDir>/**/*.spec.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  transform: {
    '^.+.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!ol/)']
}
