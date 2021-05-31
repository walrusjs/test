import { isLernaPackage } from '@birman/utils';
import { existsSync } from 'fs';
import { join } from 'path';
import assert from 'assert';
import type { Config } from '@jest/types';
import { BirmanTestArgs } from '../types';

export default function (cwd: string, args: BirmanTestArgs) {
  const testMatchTypes = ['spec', 'test'];
  if (args.e2e) {
    testMatchTypes.push('e2e');
  }

  const isLerna = isLernaPackage(cwd);
  const hasPackage = isLerna && args.package;
  const testMatchPrefix = hasPackage ? `**/packages/${args.package}/` : '';
  const hasSrc = existsSync(join(cwd, 'src'));

  if (hasPackage) {
    assert(
      existsSync(join(cwd, 'packages', args.package!)),
      `You specified --package, but packages/${args.package} does not exists.`
    );
  }

  const jestConfig: Config.InitialOptions = {
    collectCoverageFrom: [
      'index.{js,jsx,ts,tsx}',
      hasSrc && 'src/**/*.{js,jsx,ts,tsx}',
      isLerna && !args.package && 'packages/*/src/**/*.{js,jsx,ts,tsx}',
      isLerna && args.package && `packages/${args.package}/src/**/*.{js,jsx,ts,tsx}`,
      '!**/typings/**',
      '!**/types/**',
      '!**/fixtures/**',
      '!**/examples/**',
      '!**/*.d.ts'
    ].filter(Boolean),
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss|stylus)$': require.resolve('identity-obj-proxy'),
      "@/([^\\.]*)$": "<rootDir>/src/$1"
    },
    setupFiles: [require.resolve('../../helpers/setupFiles/shim')],
    setupFilesAfterEnv: [require.resolve('../../helpers/setupFiles/jasmine')],
    testMatch: [`${testMatchPrefix}**/?*.(${testMatchTypes.join('|')}).(j|t)s?(x)`],
    testPathIgnorePatterns: ['/node_modules/', '/fixtures/'],
    transform: {
      "\\.[jt]sx?$": ['esbuild-jest', {
          loaders: {
            '.spec.js': 'jsx',
            '.js': 'jsx'
          }
        }
      ],
      '^.+\\.(css|less|sass|scss|stylus)$': require.resolve('../../helpers/transformers/css'),
      '^(?!.*\\.(js|jsx|ts|tsx|css|less|sass|scss|stylus|json)$)': require.resolve(
        '../../helpers/transformers/file'
      )
    },
    verbose: true,
    transformIgnorePatterns: [],
    // 用于设置 jest worker 启动的个数
    ...(process.env.MAX_WORKERS ? { maxWorkers: Number(process.env.MAX_WORKERS) } : {})
  }

  return jestConfig;
}
