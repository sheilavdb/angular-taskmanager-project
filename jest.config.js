const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg|css|scss|sass|less)$",
    },
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
    "^.+\\.(ts|js|html|css|scss|sass|less)$": "jest-preset-angular",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
