/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//@noflow

const viteConfig = async ({ mode }) => ({
  // when built in CI, change the base URL so baseweb.design/ladle works
  base: process.env.CLOUDFLARE_BUILD ? '/ladle/' : '/',
  define: {
    __BROWSER__: true,
    __NODE__: false,
    __DEV__: mode === 'development',
  },
});

export default viteConfig;
