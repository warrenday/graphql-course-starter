module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/server/**/*.test.ts"], // Adjust the path to match your backend test files
  transform: {
    "\\.(graphql)$": "@graphql-tools/jest-transform",
    "^.+\\.ts?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
};
