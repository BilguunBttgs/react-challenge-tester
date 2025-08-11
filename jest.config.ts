import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  displayName: "agis/agis-dash",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  collectCoverage: true,
  coverageDirectory: "./coverage",

  collectCoverageFrom: [
    "src/app/components/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/*.d.ts",
    "!**/playwright/**",
    "!jest.config.ts",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
  },
};

export default createJestConfig(customJestConfig);
