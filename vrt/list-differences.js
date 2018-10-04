#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */

const readDir = require('recursive-readdir');
const inlineImage = require('@nib/buildkite-inline-image');
const path = require('path');
const {promisify} = require('util');

const readDirAsync = promisify(readDir);

async function main() {
  const [baselineFiles, diffFiles, latestFiles] = await Promise.all([
    readDirAsync(path.resolve(__dirname, 'baseline')),
    readDirAsync(path.resolve(__dirname, 'diff')),
    readDirAsync(path.resolve(__dirname, 'latest')),
  ]);

  if (!diffFiles.length) {
    return console.log('All VRT files are matching!');
  }

  diffFiles.forEach((diffFilePath, index) => {
    console.log('Exected image:');
    inlineImage.inlineArtifactImage(
      findBaseLineImage({baselineFiles, pathToDiff: diffFilePath}),
    );
    console.log('Actual image:');
    inlineImage.inlineArtifactImage(latestFiles[index]);
    console.log('Diff image:');
    inlineImage.inlineArtifactImage(diffFilePath);
  });
}

function findBaseLineImage({pathToDiff, baselineFiles}) {
  const fileName = path.relative(__dirname, pathToDiff);
  return baselineFiles.find(files => {
    files.includes(fileName);
  });
}

main().catch(console.error);
