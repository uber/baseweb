if [ "$CI" != true ]; then
  echo "\n\n\n  \033[101;30m Only the CI can publish to npm. \033[0m" 1>&2;
  exit 1;
fi;

# When Buildkite publishes to npm, the published files are available in the root
# directory, which allows for a clean include or require of sub-modules.
yarn build
cp -r ./dist/* ./
