#!/usr/bin/env bash

if [ -z "$CI" ]; then
  echo "Not running prepublish outside of CI"
  exit 1
fi

yarn build
ls | grep -v dist | xargs rm -rf
mv dist/* .
