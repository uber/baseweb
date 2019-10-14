#!/bin/bash

# set -euo pipefail

echo "👁  VRT: Fetch branches in case the --vrt branch already exists"
git fetch

# echo "Trigger install script for puppeteer"
# yarn add puppeteer

echo "👁  VRT: Run and update visual regression tests"
yarn vrt -u

# Were there any changes in the snapshots?
if git diff-index --quiet HEAD vrt/__image_snapshots__; then
    echo "👁  VRT: No changes detected, looks good"
    exit
else
    echo "👁  VRT: Changes were detected and snapshots have been updated"
    
    echo $BUILDKITE_COMMIT
    echo $BUILDKITE_BRANCH

    # create a branch or checkout existing one
    git checkout $BUILDKITE_BRANCH--vrt || git checkout -b $BUILDKITE_BRANCH--vrt
    # stage new shapshots
    git add vrt/__image_snapshots__
    # commit new shapshots
    git commit -m "tests(vrt): update snapshots for ${BUILDKITE_COMMIT:0:5}"
    # push branch upstream
    git push --set-upstream origin $BUILDKITE_BRANCH--vrt
    # open a pull request with vrt branch into base branch
    # ???

    exit -1
fi
