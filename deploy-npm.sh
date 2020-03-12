#!/bin/bash

set -e

apt-get update
apt-get install -y jq

this_commit=$(echo $BUILDKITE_COMMIT | tr -d '"')
tags=$(curl https://api.github.com/repos/uber/baseweb/git/refs/tags?access_token=${GITHUB_AUTH_TOKEN})
latest_tagged_commit=$(echo $tags | jq '.[-1].object.sha' | tr -d '"')
BASEDIR=$(pwd)

echo this commit: $this_commit
echo latest tagged commit: $latest_tagged_commit

#BUILDKITE_MESSAGE="Release v8.4.0 (#1532)"
if [ "$this_commit" = "$latest_tagged_commit" ]; then
  echo current commit matches latest tagged commit
  echo deploying to now
  version=$(echo $BUILDKITE_MESSAGE | cut -d' ' -f 2)
  echo version $version

  # publish baseui
  rm .npmrc
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc
  yarn build
  npm publish dist

  # publish eslint-plugin-baseui
  cd $BASEDIR
  cd packages/eslint-plugin-baseui
  node "$BASEDIR/scripts/sync-package-versions.js" package.json
  npm publish
else
  echo current commit does not match latest tagged commit
  echo exited without deploying to now
fi
