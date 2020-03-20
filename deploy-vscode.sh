#!/bin/bash

set -e

# publish the vscode extension
BASEDIR=$(pwd)
cd $BASEDIR
cd packages/baseweb-vscode-extension
node "$BASEDIR/scripts/sync-package-versions.js" package.json
yarn
yarn build
./node_modules/.bin/vsce publish --yarn -p $AZURE_TOKEN
