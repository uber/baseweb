/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  output: "export",
  distDir: "../public",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    esmExternals: "loose",
    externalDir: true,
    webpackBuildWorker: true,
  },
  webpack: (config, { dev, isServer, webpack }) => {
    // workaround for react-view and babel
    config.resolve.fallback = { fs: false };
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
        __BROWSER__: !isServer,
        __SERVER__: isServer,
      }),
    );
    return config;
  },
});
