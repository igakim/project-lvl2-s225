#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { getRenderList } from '../renderers';

program
  .version('0.0.1')
  .description(`Compares two configuration files and shows a difference.\n  Available format type: ${getRenderList()}`)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, option) =>
    console.log(genDiff(firstConfig, secondConfig, option)))
  .parse(process.argv);

