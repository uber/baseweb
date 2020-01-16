#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const fetch = require('isomorphic-fetch');
const fs = require('fs');
const path = require('path');
const tar = require('tar');
const mkdirp = require('mkdirp');
const childProcess = require('child_process');

// eslint-disable-next-line no-console
console.log(`
This script generates the legacy documentation sites hosted on Netlify.

Once it's finished, go to the Netlify team we have, and update the manual deployments, if needed.

If you need to add a new major legacy version, just add it to 'majors' configuration object,
create a new deployment in Netlify, and finally add a CNAME in Cloudflare.
`);

const majors = {
  v1: {
    buildCommand: 'yarn build-storybook',
    distFolder: 'docs',
  },
  v2: {
    buildCommand: 'yarn build-storybook',
    distFolder: 'docs',
  },
  v3: {
    buildCommand: 'yarn build-storybook',
    distFolder: 'docs',
  },
  v4: {
    buildCommand: 'yarn build-storybook',
    distFolder: 'docs',
  },
  v5: {
    buildCommand: 'yarn documentation:build',
    distFolder: 'public',
  },
  v6: {
    buildCommand: 'yarn documentation:build',
    distFolder: 'public',
  },
};

async function main() {
  const releases = await getReleases();

  const latestMajors = getLatestMajors(releases);

  for (let version in latestMajors) {
    const filePath = path.resolve(__dirname, '../public', `${version}.tar`);
    const directoryTmp = path.resolve(__dirname, '../public', `${version}-tmp`);
    const directory = path.resolve(__dirname, '../public', `${version}`);

    mkdirp.sync(directoryTmp);
    mkdirp.sync(directory);

    await downloadFile({
      latestMajors,
      version,
      filePath,
    });

    tar.x({
      file: filePath,
      cwd: directoryTmp,
      sync: true,
      strip: 1,
    });

    // eventstream 3 has a security issue and was removed from the registry
    if (Number(version.replace('v', '')) < 5) {
      patchEventstream(path.resolve(directoryTmp, 'package.json'));
    }

    childProcess.execSync('yarn install', {
      cwd: directoryTmp,
    });

    childProcess.execSync(majors[version].buildCommand, {
      cwd: directoryTmp,
    });

    childProcess.execSync(
      `cp -a ${directoryTmp}/${majors[version].distFolder}/. ${directory}`,
    );
    childProcess.execSync(`rm -rf ${filePath}`);
    childProcess.execSync(`rm -rf ${directoryTmp}`);
  }
}

async function downloadFile({latestMajors, version, filePath}) {
  const writer = fs.createWriteStream(filePath);

  const tarballResponse = await fetch(latestMajors[version].tarball_url);
  // $FlowFixMe
  tarballResponse.body.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function getReleases() {
  let currentPage = 1;
  let allReleases = [];

  let currentPageResults = await getReleasesForPage(currentPage);

  while (currentPageResults.length > 0) {
    allReleases = [...allReleases, ...currentPageResults];
    currentPage += 1;
    currentPageResults = await getReleasesForPage(currentPage);
  }

  return allReleases;
}

async function getReleasesForPage(page) {
  const result = await fetch(
    `https://api.github.com/repos/uber/baseweb/releases?page=${page}`,
    {
      headers: {
        // $FlowFixMe
        Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`,
      },
    },
  );
  return result.json();
}

function patchEventstream(packageJsonPath) {
  const packageJson = require(packageJsonPath);
  packageJson.resolutions = {
    '**/event-stream': '^4.0.1',
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson), 'utf-8');
}

function getLatestMajors(releases) {
  return Object.keys(majors).reduce((versions, major) => {
    versions[major] = releases.find(versionFilter(major));
    return versions;
  }, {});
}

function versionFilter(major) {
  return function(release) {
    return release.tag_name.includes(major);
  };
}

// eslint-disable-next-line no-console
main().catch(console.error);
