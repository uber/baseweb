#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const pkgJson = JSON.parse(fs.readFileSync("./package.json"));

const publishNext = () => {
  const shortHash = execSync("git rev-parse --short HEAD").toString().trim();
  const version = `0.0.0-next-${shortHash}`;
  console.log(`Publishing baseui ${version}`);
  pkgJson.version = version;
  delete pkgJson.scripts.prepare;
  fs.writeFileSync("./dist/package.json", JSON.stringify(pkgJson, null, 2));

  try {
    execSync("cd dist && npm publish --tag next");
  } catch (e) {
    console.log(e);
    console.log("Next publish failed.");
  }
};

fetch(`https://registry.npmjs.org/baseui`)
  .then((response) => response.json())
  .then((data) => {
    const latest = data["dist-tags"].latest;
    console.log(`Latest version of baseui is: ${latest}`);
    if (latest !== pkgJson.version) {
      console.log(
        `The package.json version ${pkgJson.version} is different from the one that's published ${latest}.`
      );
      console.log(`Publishing baseui@${pkgJson.version}...`);
      delete pkgJson.scripts.prepare;
      fs.writeFileSync("./dist/package.json", JSON.stringify(pkgJson, null, 2));
      try {
        execSync("cd dist && npm publish");
      } catch (e) {
        console.log(e);
        console.log("Stable publish failed.");
      }
    }
    publishNext();
  })
  .catch((error) => {
    console.error("Error when fetching latest baseui version:", error);
    publishNext();
  });
