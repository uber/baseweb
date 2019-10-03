#!/bin/bash

set -e

yarn install
mkdir public
yarn documentation:build
