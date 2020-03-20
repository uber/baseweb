#!/bin/bash

set -e

echo deploying baseui to npm
# publish baseui
rm .npmrc
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc
yarn build
npm publish dist

# publish eslint-plugin-baseui
echo deploying eslint-plugin-baseui to npm
BASEDIR=$(pwd)
cd $BASEDIR
cd packages/eslint-plugin-baseui
node "$BASEDIR/scripts/sync-package-versions.js" package.json
npm publish
