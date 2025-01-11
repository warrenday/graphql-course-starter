module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  testMatch: ["**/src/**/*.test.ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
