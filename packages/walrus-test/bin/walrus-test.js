#!/usr/bin/env node
const { yParser, chalk } = require('@birman/utils');

const args = yParser(process.argv.slice(2), {
  alias: {
    watch: ['w'],
    version: ['v']
  },
  boolean: ['coverage', 'watch', 'version', 'debug', 'e2e'],
  default: {
    e2e: true
  }
});

require('../lib')
  .default(args)
  .catch((e) => {
    console.error(chalk.red(e));
    process.exit(1);
  });
