#!/bin/bash

# set -euo pipefail

echo "👁  VRT: Fetch branches in case the --vrt branch already exists"
git fetch

echo "👁  VRT: Trigger install script for puppeteer"
yarn add puppeteer

echo "👁  VRT: Run and update visual regression tests"
yarn vrt -u

# Were there any changes in the snapshots?
if git diff-index --quiet HEAD vrt/__image_snapshots__; then
    echo "👁  VRT: No changes detected, looks good"
    exit
else
    echo "👁  VRT: Changes were detected and snapshots have been updated"
    
    echo "👁  VRT: Create a branch or checkout existing one"
    git checkout $BUILDKITE_BRANCH--vrt || git checkout -b $BUILDKITE_BRANCH--vrt

    echo "👁  VRT: Stage new shapshots"
    git add vrt/__image_snapshots__
    
    echo "👁  VRT: Commit new shapshots"
    git commit -m "tests(vrt): update snapshots for ${BUILDKITE_COMMIT:0:5}"

    echo "👁  VRT(TEST): Print git status"
    git status
    
    # echo "👁  VRT: Push branch upstream"
    # git push --set-upstream origin $BUILDKITE_BRANCH--vrt
    
    # open a pull request with vrt branch into base branch
    # ???

    exit -1
fi
