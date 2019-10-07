#!/bin/bash

set -e

branchUrl=$(echo $BUILDKITE_BRANCH | tr / -)
url="https://baseui-git-$branchUrl.uber-ui-platform.now.sh/"

attempt_counter=0
max_attempts=20

until $(curl --output /dev/null --silent --head --fail $url); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    printf '.'
    attempt_counter=$(($attempt_counter+1))
    sleep 5
done

yarn blc $url -ro --exclude components/avatar --exclude github.com
