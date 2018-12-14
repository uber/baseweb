/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// automatically import all files ending in *.stories.js
const req = require.context(
  '../src',
  true,
  /^((?!template-component\/).)*.stories.js$/,
);

function isUnstable(filename) {
  const unstableComponents = ['file-uploader'];
  return unstableComponents.some(c => filename.includes(c));
}

export default function loadStories() {
  require('../docs/pages/pages.js');

  const stable = req.keys().filter(c => !isUnstable(c));
  const unstable = req.keys().filter(isUnstable);

  stable.concat(unstable).forEach(filename => req(filename));
}
