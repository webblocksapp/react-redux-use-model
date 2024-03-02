import { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const paths = compilerOptions.paths;

const config: Config.InitialOptions = {
  verbose: true,
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, {
      prefix: '<rootDir>',
    }),
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};

export default config;
