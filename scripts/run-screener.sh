#!/bin/bash

set -e

changes=$(git diff HEAD^ HEAD -- src)

if [ -z "$changes" ]
then
  echo "no changes in the src folder, no need to run screener"
  exit 0
else
  yarn run screener-storybook "$@"
fi
