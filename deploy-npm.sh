#!/bin/bash

set -e

echo deploying baseui to npm
# publish baseui
rm .npmrc
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc
yarn build
npm publish dist

echo deploying eslint-plugin-baseui to npm
# publish eslint-plugin-baseui
cd $BASEDIR
cd packages/eslint-plugin-baseui
node "$BASEDIR/scripts/sync-package-versions.js" package.json
npm publish
