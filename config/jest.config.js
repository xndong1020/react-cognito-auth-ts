module.exports = {
  rootDir: "..",
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  coverageDirectory: "<rootDir>/tests/__coverage__/",
  setupFiles: ["<rootDir>/tests/__mocks__/shim.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.(css|scss|less)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: ["/node_modules/"],
  testRegex: "\\.(spec|test)\\.(ts|tsx)$",
  moduleDirectories: ["node_modules"],
  globals: {
    DEVELOPMENT: false,
    FAKE_SERVER: false,
  },
  verbose: true,
  testEnvironmentOptions: {
    url: "http://localhost:8080/",
  },
};
