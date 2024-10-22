import { runCLI } from 'jest';
import { createDebug, mergeConfig } from '@birman/utils';
import assert from 'assert';
import { join } from 'path';
import { existsSync } from 'fs';
import createDefaultConfig from './create-default-config';
import { JestCliOptions } from './config';
import { WalrusTestArgs, PickedJestCliOptions } from './types';

const debug = createDebug('walrus:test');

export default async function (args: WalrusTestArgs) {
  process.env.NODE_ENV = 'test';

  // 找不到文件时允许测试通过
  args.passWithNoTests = true;

  if (args.debug) {
    createDebug.enable('walrus:test');
  }

  debug(`args: ${JSON.stringify(args)}`);

  // Print related versions
  if (args.version) {
    console.log(`walrus-test@${require('../package.json').version}`);
    console.log(`jest@${require('jest/package.json').version}`);
    return;
  }

  const cwd = args.cwd || process.cwd();

  // Read config from cwd/jest.config.js
  const userJestConfigFile = join(cwd, 'jest.config.js');
  const userJestConfig = existsSync(userJestConfigFile) && require(userJestConfigFile);
  debug(`config from jest.config.js: ${JSON.stringify(userJestConfig)}`);

  // Read jest config from package.json
  const packageJSONPath = join(cwd, 'package.json');
  const packageJestConfig = existsSync(packageJSONPath) && require(packageJSONPath).jest;
  debug(`jest config from package.json: ${JSON.stringify(packageJestConfig)}`);

  // Merge configs
  // user config and args config could have value function for modification
  const config = mergeConfig(createDefaultConfig(cwd, args), packageJestConfig, userJestConfig);
  debug(`final config: ${JSON.stringify(config)}`);

  // Generate jest options
  const argsConfig = Object.keys(JestCliOptions).reduce((prev, name) => {
    if (args[name]) prev[name] = name;

    // Convert alias args into real one
    const { alias } = JestCliOptions[name];
    if (alias && args[alias]) prev[name] = args[alias];
    return prev;
  }, {} as PickedJestCliOptions);
  debug(`config from args: ${JSON.stringify(argsConfig)}`);

  // Run jest
  const result = await runCLI(
    {
      // @ts-ignore
      _: args._ || [],
      // @ts-ignore
      $0: args.$0 || '',
      // 必须是单独的 config 配置，值为 string，否则不生效
      // @ts-ignore
      config: JSON.stringify(config),
      ...argsConfig
    },
    [cwd]
  );
  debug(result);

  // Throw error when run failed
  assert(result.results.success, `Test with jest failed`);
}
