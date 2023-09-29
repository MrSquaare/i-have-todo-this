import type { Config } from "jest";

const config: Config = {
  rootDir: "src",
  transform: {
    "^.+\\.m?[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
    "^.+\\.(css|svg)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ["../jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  coverageDirectory: "../coverage",
};

export default config;
