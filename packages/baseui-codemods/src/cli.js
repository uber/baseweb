#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import yargs from 'yargs';
import chalk from 'chalk';
import {Stepper, step} from '@dubstep/core';

import styledV7TypeArguments from './styled-v7-type-arguments.js';
import styledV8ToThemedStyled from './styled-v8-themedStyled.js';
import v9ThemeScale from './v9-theme-scale.js';

// Each mod or script is an array of dubstep steps
// Users can select one of these to run from the CLI via `--mod`
const MODS = {
  v8Types: [
    _step(
      'Apply type arguments to baseui "styled" calls.',
      styledV7TypeArguments,
    ),
    _step(
      'Migrate styled theme generic to "createThemedStyled".',
      styledV8ToThemedStyled,
    ),
  ],
  v9Styles: [
    _step(
      'Map theme typography and components to v9. These changes are not idempotent!',
      v9ThemeScale,
    ),
  ],
};

// Wrapper for step
// Mainly so that we can log each step, which dubstep doesn't do
function _step(msg, fn) {
  return step(msg, async () => {
    console.log(chalk.dim(`⮑  ${msg}`));
    await fn({dir});
  });
}

// Set up yargs
// Includes usage on -h or --help
const {argv} = yargs
  .usage(
    `${chalk.white.bold('baseui-codemods')}

You can use this CLI tool to run various scripts (codemods) that will automate laborious migrations between major versions of the "baseui" library.

Usage:
  $ baseui-codemods --dir=<PATH_TO_CODE> --mod=<CODEMOD_NAME>

Example:
  $ baseui-codemods --dir=src --mod=v8Types

Codemods:
${Object.keys(MODS)
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

// Get `dir` parameter
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

// Get `mod` parameter
const mod = argv.mod;
if (!mod || !Object.keys(MODS).includes(mod)) {
  console.error(
    `${chalk.red(
      'error',
    )} Must specify a valid codemod to run with the "--mod" argument. Here are the currently available mods:${Object.keys(
      MODS,
    )
      .map(m => `\n  --mod=${m}`)
      .join('')}`,
  );
  process.exit(1);
}

// Retrieve steps for codemod
const steps = MODS[mod];

// Add a finish step to script for logging completion
const start = process.hrtime();
steps.push(
  step('finish', async () => {
    const end = process.hrtime(start);
    console.log(`Successfully completed running ${chalk.cyan(mod)} codemod.`);
    console.log(`✨  Done in ${(end[0] + end[1] / 1e9).toFixed(2)}s.`);
  }),
);

// We are ready to codemod!
console.log(`${chalk.white.bold('baseui-codemods')} ${chalk.cyan(mod)}`);

// Run selected codemod
const stepper = new Stepper(steps);
stepper.run();
