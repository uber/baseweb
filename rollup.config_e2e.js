// @flow

import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

export default {
  input: `e2e/index.js`,
  output: [
    {
      file: 'e2e/dist/index.js',
      format: 'umd',
      sourcemap: 'inline',
    },
  ],
  external: ['htmlparser2'],
  plugins: [
    progress(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    json(),
    commonjs({
      include: ['node_modules/**'],
      exclude: ['node_modules/process-es6/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'Fragment',
          'PropTypes',
          'createElement',
          'cloneElement',
          'isValidElement',
          'createContext',
          'createRef',
        ],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/@storybook/addon-knobs/dist/index.js': ['boolean'],
      },
    }),
    babel({
      babelrc: false,
      presets: [['es2015', {modules: false}], 'stage-1', 'react'],
      plugins: ['external-helpers'],
    }),
    visualizer(),
    filesize(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      E2E_TEST: JSON.stringify('true'),
    }),
  ],
};
