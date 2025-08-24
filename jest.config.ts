// jest.config.ts
/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */
import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { readFileSync } from "node:fs";

const tsconfig = JSON.parse(readFileSync("./tsconfig.json", "utf8"));

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json", diagnostics: false }],
  },
  moduleNameMapper: {
    ...(tsconfig.compilerOptions?.paths
      ? pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" })
      : {}),
    "\\.(jpg|jpeg|png|gif|webp|svg|ico|bmp|ttf|woff2?)$": "<rootDir>/__mocks__/fileMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
export default config;
