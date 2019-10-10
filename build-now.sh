#!/bin/bash

set -e

yarn install --ignore-engines
mkdir public
yarn documentation:build
