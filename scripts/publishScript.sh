#! /bin/bash
set -e

current_version=$(node -p "require('./package').version")

printf "Next version (current is $current_version)? "
read next_version

if ! [[ $next_version =~ ^[0-9]+\.[0-9]+\.[0-9](-.+)? ]]; then
  echo "Version must be a valid semver string, e.g. 1.0.2 or 2.3.0-beta.1"
  exit 1
fi

npm version "$next_version"

echo "Updated version to ${next_version}"
read -p "Are you ready to create a new tag ${next_version} and publish it? [Y/n] " -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ ! $REPLY == "" ]]
then
  echo "Exit by user"
  exit 1
fi

git tag "$next_version"
git push origin --tags

npm publish dist --registry https://prod-nexus.sprinklr.com/nexus/repository/npm-internal/

echo "Version ${next_version} is successfully published."
