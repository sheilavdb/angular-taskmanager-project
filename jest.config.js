module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testMatch: ["**/+(*.)+(spec).+(ts)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "html", "js", "json"],
  testEnvironment: "jsdom",
};
