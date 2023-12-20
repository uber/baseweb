/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

const viteConfig = async ({ mode }) => ({
  // when built in CI, change the base URL so baseweb.design/ladle works
  base: process.env.CLOUDFLARE_BUILD ? "/ladle/" : "/",
  define: {
    __BROWSER__: true,
    __NODE__: false,
    __DEV__: mode === "development",
  },
  build: {
    rollupOptions: {
      onLog: (_, log) => {
        // Rollup 4 warns about misplaced "PURE" comments
        // these help three-shaking but not critical when bundling
        if (
          log.message.includes(
            "due to the position of the comment"
          )
        ) {
          return;
        }
      },
    },
  },
});

export default viteConfig;
