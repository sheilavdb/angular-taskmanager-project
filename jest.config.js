const { pathsToModuleNameMapper } = require("ts-jest"); // for ts-jest < 27
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular",
  },
  moduleNameMapper: {
    "\\.(scss|sass|css|less)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  testEnvironment: "jsdom",
};
