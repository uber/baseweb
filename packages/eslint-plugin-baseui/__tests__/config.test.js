/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
const path = require('path');
const CLIEngine = require('eslint').CLIEngine;
const Plugin = require('../index');

test('Recommended config', () => {
  const cli = new CLIEngine({
    useEslintrc: true,
    cwd: path.resolve(__dirname, 'example-config'),
    configFile: path.resolve(__dirname, 'example-config/.eslintrc.js'),
    resolvePluginsRelativeTo: path.resolve(__dirname, 'example-config'),
  });
  const config = cli.getConfigForFile(path.resolve(__dirname, 'example-config/fixture.js'));
  expect(config.rules).toMatchObject(Plugin.configs.recommended.rules);
  expect(config.plugins).toMatchObject(Plugin.configs.recommended.plugins);
});
