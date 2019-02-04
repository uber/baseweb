#!/bin/bash

set -e

apt-get install -y jq

this_commit=$(echo $BUILDKITE_COMMIT | tr -d '"')
tags=$(curl https://api.github.com/repos/uber-web/baseui/git/refs/tags?access_token=${GITHUB_AUTH_TOKEN})
latest_tagged_commit=$(echo $tags | jq '.[-1].object.sha' | tr -d '"')

if [ "$this_commit" = "$latest_tagged_commit" ]; then
  echo current commit matches latest tagged commit
  echo deploying to now...

  yarn documentation:build &&
  yarn now --team=baseui --token=$ZEIT_NOW_TOKEN &&
  yarn now alias --team=baseui --token=$ZEIT_NOW_TOKEN &&
  yarn now rm baseui-documentation --safe --team=baseui --token=$ZEIT_NOW_TOKEN  --yes
else
  echo current commit does not match latest tagged commit
  echo exited without deploying to now
fi
