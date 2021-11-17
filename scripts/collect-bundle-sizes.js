#!/usr/bin/env node
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
const {spawn, execSync} = require('child_process');
const {mkdirSync, writeFileSync} = require('fs');
const {resolve} = require('path');
const fetch = require('node-fetch').default;
const puppeteer = require('puppeteer');

const PORT = 8080;
const LADLE_URL = `http://localhost:${PORT}`;
const LADLE_META_URL = `${LADLE_URL}/meta.json`;

async function waitForPort(port) {
  const maxWait = 60_000;
  const singleWait = 5000;
  let totalWait = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await new Promise(resolve => setTimeout(resolve, singleWait));
    totalWait += 1;
    if (totalWait > maxWait) {
      throw new Error(
        `wait for port exceeded timeout ${maxWait / 1000} seconds`,
      );
    }
    const response = await fetch(`http://localhost:${port}`);
    if (response.status === 200) {
      break;
    }
  }
}

async function main() {
  // serve ladle and wait for it to begin running
  // find stories from http://localhost:61000/meta.json
  // for each story load it up in puppeteer and get the download size
  // save the data to buildkite artifacts
  // if current data is substantially larger then fail the job

  execSync(
    'yarn ladle build --out build-ladle --stories src/**/*.scenario.js',
    {stdio: 'inherit'},
  );
  const ladle = spawn('yarn', ['static-server', 'build-ladle', '--port', PORT]);
  ladle.stderr.on('data', data => console.error(`ladle error: ${data}`));
  await waitForPort(PORT);
  console.log(`ladle server available at ${LADLE_URL}`);

  const metaResponse = await fetch(LADLE_META_URL);
  if (metaResponse.status !== 200) {
    console.error(metaResponse);
    throw new Error('failed to fetch story metadata');
  }

  const metadata = await metaResponse.json();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const sizes = {};

  for (const storyTitle in metadata.stories) {
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');

    let bytesReceived = 0;
    const requests = new Map();

    client.on('Network.requestWillBeSent', event => {
      requests.set(event.requestId, event.request.url);
    });

    client.on('Network.dataReceived', event => {
      const url = requests.get(event.requestId);
      if (!url) {
        console.log(`no url recorded for requestId: ${event.requestId}`);
        return;
      }
      bytesReceived += event.dataLength;
    });

    await page.goto(`${LADLE_URL}?mode=preview&story=${storyTitle}`, {
      waitUntil: 'networkidle0',
    });

    console.log(storyTitle, `${bytesReceived / 1000}kb`);
    sizes[storyTitle] = bytesReceived;
    await page.close();
  }

  await browser.close();
  ladle.kill();

  let artifactsDir = resolve(__dirname, '../__artifacts__/bundle-size');
  if (process.env.BUILDKITE) {
    artifactsDir = '/__artifacts__/bundle-size';
  }

  const bundleSizeJsonPath = resolve(artifactsDir, 'bundle-size.json');
  try {
    mkdirSync(artifactsDir, {recursive: true});
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
  writeFileSync(bundleSizeJsonPath, JSON.stringify(sizes));
  console.log(`bundle-size data written to ${bundleSizeJsonPath}`);

  process.exit(0);
}

main();
