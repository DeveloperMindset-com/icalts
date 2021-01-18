module.exports = {
  "displayName": "test",
  "preset": "ts-jest",
  "testEnvironment": "node",
  "transform": {
    "^.+\\.[jt]s$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "testPathIgnorePatterns": [
    "/dist/",
    "/coverage",
    "/node_modules/"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ],
  "collectCoverage": true,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  }
}