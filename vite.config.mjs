/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//@noflow
import flowRemoveTypes from 'flow-remove-types';
import { createFilter } from 'rollup-pluginutils';
import { readFile } from 'fs';

const EXPORT_TYPES = /export\stype\s\*\sfrom\s[a-zA-Z0-9."/\-_']+;/gm;

/**
 * Create a Vite plugin object
 * @returns {import('vite').Plugin} Returns esbuild plugin object
 */
function flowPlugin(
  options /** {import('../shared/types').VitePluginOptions */ = {
    include: /\.(flow|jsx?)$/,
    exclude: /node_modules/,
    flow: {
      all: false,
      pretty: false,
      ignoreUninitializedFields: false,
    },
  }
) {
  const filter = createFilter(options.include, options.exclude);
  return {
    enforce: 'pre',
    name: 'flow',
    transform(src, id) {
      // eslint-disable-line consistent-return
      if (filter(id)) {
        const transformed = flowRemoveTypes(src, options.flow);
        return {
          code: transformed.toString().replace(EXPORT_TYPES, ''),
          map: null,
        };
      }
      return undefined;
    },
  };
}

function esbuildFlowPlugin(
  filter = /\.(flow|jsx?)$/,
  flowOptions = {
    all: false,
    pretty: false,
    ignoreUninitializedFields: false,
  }
) {
  return {
    name: 'flow',
    // @ts-ignore
    setup(build) {
      // @ts-ignore
      build.onLoad({ filter }, async ({ path, namespace }) => {
        try {
          const src = await new Promise((resolve, reject) => {
            readFile(path, (error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data.toString('utf-8'));
              }
            });
          });
          const transformed = flowRemoveTypes(src, flowOptions);
          return {
            contents: transformed.toString().replace(EXPORT_TYPES, ''),
            loader: src.includes('@flow\n') ? 'jsx' : 'js',
          };
        } catch (error) {
          return {
            errors: [
              {
                // @ts-ignore
                text: error.message,
                location: {
                  file: path,
                  namespace,
                },
                detail: error,
              },
            ],
          };
        }
      });
    },
  };
}

const viteConfig = async ({ mode }) => ({
  // when built in CI, change the base URL so baseweb.design/ladle works
  // eslint-disable-next-line cup/no-undef
  base: process.env.BUILDKITE_COMMIT ? '/ladle/' : '/',
  plugins: [flowPlugin()],
  define: {
    __BROWSER__: true,
    __NODE__: false,
    __DEV__: mode === 'development',
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  esbuild: {
    include: /\.(tsx?|jsx?)$/,
    exclude: [],
    loader: 'tsx',
  },
});

export default viteConfig;
