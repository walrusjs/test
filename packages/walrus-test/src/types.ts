import { ArgsType } from '@birman/utils';
import { runCLI } from 'jest';
import { options as CliOptions } from 'jest-cli/build/cli/args';

export interface WalrusTestArgs extends Partial<ArgsType<typeof runCLI>['0']> {
  version?: boolean;
  cwd?: string;
  debug?: boolean;
  e2e?: boolean;
  package?: string;
}

export type PickedJestCliOptions = {
  [T in keyof typeof CliOptions]?: T extends keyof WalrusTestArgs[T]
    ? T
    : typeof CliOptions[T] extends { alias: infer U }
    ? WalrusTestArgs[T]
    : never;
};
