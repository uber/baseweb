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
    await new Promise((resolve) => setTimeout(resolve, singleWait));
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

async function measurePageBytesReceived(browser, url) {
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  let bytesReceived = 0;
  client.on('Network.dataReceived', (event) => {
    bytesReceived += event.dataLength;
  });

  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.close();

  return bytesReceived;
}

async function downloadMasterBundleSizeData() {
  const BK_API_URL = 'https://api.buildkite.com/v2';
  const BK_BASEWEB_URL = `${BK_API_URL}/organizations/uberopensource/pipelines/baseweb`;

  const buildkiteToken = process.env.BUILDKITE_UBEROPENSOURCE_API_TOKEN;
  if (!buildkiteToken) {
    throw new Error('BUILDKITE_UBEROPENSOURCE_API_TOKEN env var not set');
  }

  function bkfetch(url, options = {}) {
    return fetch(url, {
      headers: {Authorization: `Bearer ${buildkiteToken}`},
      ...options,
    });
  }

  const buildsResponse = await bkfetch(
    `${BK_BASEWEB_URL}/builds?branch=master`,
  );
  if (buildsResponse.status !== 200) {
    throw new Error('failed to list buildkite builds');
  }
  const builds = await buildsResponse.json();
  for (const build of builds) {
    const artifactsResponse = await bkfetch(
      `${BK_BASEWEB_URL}/builds/${build.number}/artifacts`,
    );
    if (artifactsResponse.status !== 200) {
      throw new Error('failed to list artifacts');
    }
    const artifacts = await artifactsResponse.json();

    // We could be in a situation where there is an in-progress build on master that will not have
    // the bundle size data available. Below I've implemented it so that we will continue on to
    // next available master build where bundle size data is available. This has the potential to
    // have improper comparisons on stale data, but should be quite rare. The in-progress build
    // and current build will need to have significantly changed the size.
    for (const artifact of artifacts) {
      if (artifact.filename === 'bundle-size.json') {
        // Artifact download_url provided by buildkite is a redirect to an s3 url, and is protected
        // by bk authentication. By default, node-fetch will follow all redirects and when it goes
        // to request from the s3 url it fails due to an invalid auth header. So below we will get
        // the redirected url, then make a second request without auth headers.
        const downloadRedirectResponse = await bkfetch(artifact.download_url, {
          redirect: 'manual',
        });
        if (downloadRedirectResponse.status !== 302) {
          throw new Error('failed to request artifact download url');
        }
        const redirectUrl = downloadRedirectResponse.headers.get('location');
        const dataResponse = await fetch(redirectUrl);
        if (dataResponse.status !== 200) {
          throw new Error('failed to download artifact data');
        }
        return dataResponse.json();
      }
    }
  }
}

async function main() {
  execSync(
    'yarn ladle build --out build-ladle --stories src/**/*.scenario.js',
    {stdio: 'inherit'},
  );
  const ladle = spawn('yarn', ['static-server', 'build-ladle', '--port', PORT]);
  ladle.stderr.on('data', (data) => console.error(`ladle error: ${data}`));
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

  const baselineSize = await measurePageBytesReceived(
    browser,
    `${LADLE_URL}/?mode=preview&story=__story-not-found__`,
  );
  console.log(`baseline size ${baselineSize / 1000}kb`);

  for (const storyTitle in metadata.stories) {
    const pageSize = await measurePageBytesReceived(
      browser,
      `${LADLE_URL}?mode=preview&story=${storyTitle}`,
    );
    const deltaSize = pageSize - baselineSize;
    console.log(storyTitle, `${deltaSize / 1000}kb`);
    sizes[storyTitle] = deltaSize;
  }

  await browser.close();
  ladle.kill();

  const artifactsDir = resolve(__dirname, '../__artifacts__/bundle-size');
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

  const significantDeltas = {};
  const masterBundleSizes = await downloadMasterBundleSizeData();
  for (const storyTitle in sizes) {
    const masterSize = masterBundleSizes[storyTitle];
    const currentSize = sizes[storyTitle];
    if (masterBundleSizes[storyTitle]) {
      const delta = currentSize - masterSize;
      if (Math.abs(delta) > masterSize / 100) {
        significantDeltas[storyTitle] = delta;
      }
    }
  }

  if (Object.keys(significantDeltas).length) {
    console.log(
      'The following stories had bundle size changes greater than 1%',
    );
    for (const storyTitle in significantDeltas) {
      console.log(
        `${storyTitle} master: ${masterBundleSizes[storyTitle]}b, current: ${sizes[storyTitle]}b, delta: ${significantDeltas[storyTitle]}b`,
      );
    }

    // soft fail bk job
    process.exit(2);
  }

  process.exit(0);
}

main();
