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
  },
  testEnvironment: "node",
  coverageDirectory: "../coverage",
};

export default config;
