/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const {resolve} = require('path');
const withImages = require('next-images');
const rehypePrism = require('@mapbox/rehype-prism');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism],
  },
});
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withMDX(
    withImages({
      webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
        config.resolve.alias.baseui = resolve(__dirname, '../dist');
        config.resolve.alias.examples = resolve(__dirname, 'static/examples');
        return config;
      },
      pageExtensions: ['js', 'jsx', 'mdx'],
    }),
  ),
);
