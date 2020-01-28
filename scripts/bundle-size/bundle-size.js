#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const childProcess = require('child_process');
const fs = require('fs');
const {resolve} = require('path');
const commander = require('commander');

const program = new commander.Command();

program
  .requiredOption('-c, --component <component>', 'Component name')
  .requiredOption('-e, --export-name <exportName>', 'Export name')
  .option('-a, --analyzer', 'Start analyzer');

program.parse(process.argv);

const numberOfLines = data => {
  return data.split('\n').length;
};
const removeLines = (data, lines = []) => {
  return data
    .split('\n')
    .filter((val, idx) => lines.indexOf(idx) === -1)
    .join('\n');
};

const {component, exportName} = program;

const js = `
import React from 'react';
import ReactDOM from 'react-dom';
import {${exportName}} from "../../src/${component}";

function App () {
  return <${exportName.includes(',') ? exportName[0] : exportName} />
}

ReactDOM.render(<App />, document.getElementById('root'));
`;

fs.writeFileSync(resolve(__dirname, 'entry.js'), js, {flag: 'w'});
const configPath = resolve(__dirname, 'webpack.config.js');
const statsPath = resolve(__dirname, 'stats.json');

childProcess.execSync(
  `yarn webpack --config ${configPath} --json > ${statsPath}`,
  {
    env: {
      ...process.env,
      ANALYZER: program.analyzer,
    },
  },
);

const statsString = fs.readFileSync(statsPath).toString();
// for some reason, the output is polluted with a few lines.
// we have to clean them up before processing
const statsCleaned = removeLines(statsString, [
  0,
  1,
  numberOfLines(statsString) - 2,
]);

const stats = JSON.parse(statsCleaned);
const assets = new Map(stats.assets.map(asset => [asset.name, asset]));

const webpackSize = Object.entries(stats.assetsByChunkName).map(
  ([, assetName]) => {
    const parsedSize = assets.get(assetName).size;
    const gzipSize = assets.get(`${assetName}.gz`).size;
    return {parsed: parsedSize, gzip: gzipSize};
  },
);

console.log(JSON.stringify(webpackSize));
