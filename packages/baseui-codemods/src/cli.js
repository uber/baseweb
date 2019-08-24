#!/usr/bin/env node

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import process from 'process';
import yargs from 'yargs';
import chalk from 'chalk';
import {Stepper, step} from '@dubstep/core';

import styledV7TypeArguments from './styled-v7-type-arguments.js';
import styledV8ToThemedStyled from './styled-v8-themedStyled.js';
import v9ThemeScale from './v9-theme-scale.js';

const mods = {
  v8Types: [
    step('apply type arguments to baseui styled calls', async () => {
      console.log(
        chalk.dim('⮑  Apply type arguments to baseui "styled" calls.'),
      );
      await styledV7TypeArguments({dir});
    }),
    step('migrate styled theme generic to createThemedStyled', async () => {
      console.log(
        chalk.dim('⮑  Migrate styled theme generic to "createThemedStyled".'),
      );
      await styledV8ToThemedStyled({dir});
    }),
  ],
  v9Styles: [
    step('update theme properties for v9', async () => {
      console.log(
        chalk.dim(
          '⮑  Map colors and typography to v9. These changes are not idempotent!',
        ),
      );
      await v9ThemeScale({dir});
    }),
  ],
  test: [
    step('soo', async () => {
      await new Promise(res => setTimeout(res, 2000));
    }),
  ],
};

const {argv} = yargs
  .usage(
    `${chalk.white.bold('baseui-codemods')}

You can use this CLI tool to run various scripts (codemods) that will automate laborious migrations between major versions of the "baseui" library.

Usage:
  $ baseui-codemods --dir=PATH_TO_CODE --mod=CODEMOD_NAME

Example:
  $ baseui-codemods --dir=src --mod=v8Types

Codemods:
${Object.keys(mods)
  .map(m => `  ${m}`)
  .join(`\n`)}`,
  )
  .epilogue(
    `Visit ${chalk.bold(
      'https://baseweb.design/blog',
    )} for more information on "baseui" and details on major version migrations.`,
  )
  .option('dir', {
    description: 'The directory to run the codemod on',
  })
  .option('mod', {
    description: 'The name of the codemod to run',
  })
  .help()
  .alias('help', 'h');

let dir = argv.dir;
if (!dir) {
  console.log(chalk.white.bold('baseui-codemods'));
  console.error(
    `${chalk.red(
      'error',
    )} Must specify a directory with the "--dir" argument. Ex: "--dir=src".`,
  );
  process.exit(1);
}

// terminal auto-completes directories with a '/' suffix
if (dir[dir.length - 1] === '/') {
  dir = dir.substring(0, dir.length - 1);
}

const mod = argv.mod;
if (!mod || !Object.keys(mods).includes(mod)) {
  console.error(
    `${chalk.red(
      'error',
    )} Must specify a valid codemod to run with the "--mod" argument. Here are the currently available mods:${Object.keys(
      mods,
    )
      .map(m => `\n  --mod=${m}`)
      .join('')}`,
  );
  process.exit(1);
}

const steps = mods[mod];
const start = process.hrtime();

console.log(`${chalk.white.bold('baseui-codemods')} ${chalk.cyan(mod)}`);

steps.push(
  step('finish', async () => {
    const end = process.hrtime(start);
    console.log(`Successfully completed running ${chalk.cyan(mod)} codemod.`);
    console.log(`✨  Done in ${(end[0] + end[1] / 1e9).toFixed(2)}s.`);
  }),
);

const stepper = new Stepper(steps);
stepper.run();
