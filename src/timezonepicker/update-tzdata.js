/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
// @flow

const fs = require('fs');
const path = require('path');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

// Download tzdata and collect a list of timezones. Baseui previously used a library
// to do this, but it grew stale and unmaintained. This approach is straightforward
// enough to update whenever necessary, but future improvements could include building
// this data set before baseui is published so that the data is always fresh.
async function main() {
  try {
    const tmpDir = path.join(__dirname, 'tmp');
    // $FlowFixMe - flow is not aware of recursive option
    await fs.promises.rmdir(tmpDir, {recursive: true});
    await fs.promises.mkdir(tmpDir);

    const src = `https://www.iana.org/time-zones/repository/tzdata-latest.tar.gz`;
    await exec(`curl -L ${src} | gzip -dc | tar -xf - --directory ${tmpDir}`);

    const zoneTabPath = path.join(tmpDir, 'zone1970.tab');
    const content = await fs.promises.readFile(zoneTabPath, 'utf-8');
    const lines = content.split('\n');

    const zones = [];
    for (const line of lines) {
      if (line[0] === '#') {
        continue;
      }

      const parts = line.split(/\s+/);
      if (parts.length >= 3) {
        zones.push(parts[2]);
      }
    }

    const file = [];
    file.push('/* eslint-disable header/header */');
    file.push('// @flow');
    file.push('');
    file.push('export const zones = [');
    for (const zone of zones) {
      file.push(`  '${zone}',`);
    }
    file.push('];');

    const tzdataPath = path.join(__dirname, 'tzdata.js');
    await fs.promises.writeFile(tzdataPath, file.join('\n'));

    // $FlowFixMe - flow is not aware of recursive option
    await fs.promises.rmdir(tmpDir, {recursive: true});
  } catch (error) {
    console.error(error);
  }
}

main();
