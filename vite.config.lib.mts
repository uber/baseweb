/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylexPlugin from '@stylexjs/rollup-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    stylexPlugin({
      dev: true, // Enable dev mode for human-readable class names
      useCSSLayers: true,
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: path.resolve(__dirname, 'src'),
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/stylex/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `stylex.${format}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        assetFileNames: 'baseui-theme.[ext]',
      },
    },
  },
});
