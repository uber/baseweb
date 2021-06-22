/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const {resolve} = require('path');
const withImages = require('next-images');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
});

// The following modules need to be transpiled for IE11.
// If IE11 breaks again in the future, enable production source maps to find
// which module is causing the issue.
const withTM = require('next-transpile-modules')([
  '@octokit/rest',
  '@octokit/endpoint',
  '@octokit/request',
  '@octokit/request-error',
  '@babel/core',
  '@babel/code-frame',
  '@babel/parser',
  '@babel/generator',
  '@babel/traverse',
  '@babel/types',
  '@babel/template',
  '@babel/highlight',
  '@babel/helpers',
  '@babel/helper-plugin-utils',
  '@babel/helper-builder-react-jsx',
  '@babel/helper-function-name',
  '@babel/helper-split-export-declaration',
  '@babel/plugin-transform-react-jsx',
  '@babel/plugin-transform-react-jsx-source',
  '@babel/plugin-transform-react-jsx-self',
  '@babel/plugin-transform-react-display-name',
  '@babel/plugin-syntax-jsx',
  '@babel/preset-react',
  'octokit-pagination-methods',
  'deprecation',
  'vnopts',
  'react-view',
  'ansi-styles',
  'debug',
  'chalk',
  'is-fullwidth-code-point',
  'jest-docblock',
  'gensync',
  'string-width',
  'jsesc',
]);

module.exports = withTM(
  withMDX(
    withImages({
      images: {
        loader: 'imgix',
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      publicRuntimeConfig: {
        loadYard: process.env.LOAD_YARD,
      },
      trailingSlash: true,
      webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
        config.resolve.alias.baseui = resolve(__dirname, '../dist');
        config.resolve.alias.examples = resolve(__dirname, 'examples');
        // references next polyfills example: https://github.com/zeit/next.js/tree/canary/examples/with-polyfills
        const originalEntry = config.entry;
        config['node'] = {fs: 'empty'};
        config.entry = async () => {
          const entries = await originalEntry();

          if (
            entries['main.js'] &&
            !entries['main.js'].includes('./helpers/polyfills.js')
          ) {
            entries['main.js'].unshift('./helpers/polyfills.js');
          }

          return entries;
        };

        if (dev) {
          config.devtool = 'inline-source-map';
        }

        return config;
      },
      pageExtensions: ['js', 'jsx', 'mdx'],
    }),
  ),
);
