#!/bin/bash

set -e

apt-get update
apt-get install -y jq

this_commit=$(echo $BUILDKITE_COMMIT | tr -d '"')
tags=$(curl https://api.github.com/repos/uber-web/baseui/git/refs/tags?access_token=${GITHUB_AUTH_TOKEN})
latest_tagged_commit=$(echo $tags | jq '.[length - 1].object.sha' | tr -d '"')

if [ "$this_commit" = "$latest_tagged_commit" ]; then
  echo current commit matches latest tagged commit
  echo deploying to now...

  yarn documentation:build &&
  yarn now --team=baseui --token=$ZEIT_NOW_TOKEN &&
  yarn now alias --team=baseui --token=$ZEIT_NOW_TOKEN &&

  # sets an alias based on the commit hash so that we have a snapshot of what the docs site looked like at this version.
  yarn now alias --team=baseui --token=$ZEIT_NOW_TOKEN "${latest_tagged_commit}-baseui-documentation"
else
  echo current commit does not match latest tagged commit
  echo exited without deploying to now
fi
