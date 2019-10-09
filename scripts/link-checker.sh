#!/bin/bash

set -e

branchUrl=$(echo $BUILDKITE_BRANCH | tr /: -)
branchUrl=$(echo $branchUrl | tr -d ._)

if [[ $BUILDKITE_PULL_REQUEST_REPO == *"uber-web/baseui"* ]]; then
  url="https://baseui-git-$branchUrl.uber-ui-platform.now.sh/"
else
  author=$(echo $BUILDKITE_PULL_REQUEST_REPO | cut -d'/' -f 4)
  url="https://baseui-git-fork-$author-$branchUrl.uber-ui-platform.now.sh/"
fi

echo "Checking url $url"

# based on recent zeit builds, it can take up to 7 minutes to do the build
attempt_counter=0
max_attempts=35

until $(curl --output /dev/null --silent --head --fail $url); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    printf '.'
    attempt_counter=$(($attempt_counter+1))
    sleep 30
done

yarn blc $url -ro --exclude components/avatar --exclude github.com
