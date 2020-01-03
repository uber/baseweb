#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const {writeFileSync, readdirSync, readFileSync, lstatSync} = require('fs');
const {join, basename, resolve} = require('path');

const source = resolve(__dirname, '../documentation-site/pages/blog');

/**
 * Script to read directories from documentation-site/pages/blog
 * Generates JavaScript file exporting posts Array for use by
 * Blog page
 */
module.exports = function generatePosts() {
  let posts = [];
  const postDirs = readdirSync(source)
    .map(name => join(source, name))
    .filter(a => lstatSync(a).isDirectory());

  for (let postDir of postDirs) {
    const content = readFileSync(`${postDir}/metadata.json`, 'utf-8');
    const attrs = JSON.parse(content);
    let post = {
      path: `/blog/${basename(postDir)}`,
      ...attrs,
    };
    posts.push(post);
  }

  if (posts.length) {
    posts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  const content = `const posts = ${
    posts.length ? JSON.stringify(posts) : '[]'
  }; export default posts;`;

  writeFileSync(`${process.cwd()}/documentation-site/posts.js`, content);
};
