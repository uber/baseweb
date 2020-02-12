#! /bin/bash
set -e

current_version=$(node -p "require('./package').version")

printf "Which version needs to be republished (current is $current_version)? "
read next_version

if ! [[ $next_version =~ ^[0-9]\.[0-9]+\.[0-9](-.+)? ]]; then
  echo "Version must be a valid semver string, e.g. 1.0.2 or 2.3.0-beta.1"
  exit 1
fi

git tag -d "$next_version"
git push --delete origin "$next_version"
git tag "$next_version"
git push origin --tags

npm publish dist --registry https://prod-nexus.sprinklr.com/nexus/repository/npm-internal/

echo "Version ${next_version} is successfully re-published."
