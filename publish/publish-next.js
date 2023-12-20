#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

const shortHash = execSync("git rev-parse --short HEAD").toString().trim();
const version = `0.0.0-next-${shortHash}`;

console.log(`Publishing baseui ${version}`);
const pkgJson = JSON.parse(fs.readFileSync("./package.json"));
pkgJson.version = version;
fs.writeFileSync("./dist/package.json", JSON.stringify(pkgJson, null, 2));

try {
  execSync("cd dist && npm publish --tag next");
} catch (e) {
  console.log(e);
  console.log("Publish failed.");
}
