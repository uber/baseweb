// @flow
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import commonjs from 'rollup-plugin-commonjs';

import fs from 'fs';
import path from 'path';

function getComponents() {
  return fs.readdirSync('./src/components').filter(filename => {
    const {ext, name} = path.parse(filename);
    return ext === '' && !name.startsWith('.');
  });
}

function getConfig() {
  return getComponents().map(component => {
    const filePath = `${component}/index`;
    const name = `baseui.${component}`;
    return {
      input: `src/components/${component}/index.js`,
      ...getSharedConfig({filePath, name}),
    };
  });
}

function getSharedConfig({filePath, name}) {
  return {
    output: [
      {
        file: `dist/${filePath}.js`,
        format: 'umd',
        name: name,
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        sourcemap: 'inline',
      },
      {
        file: `dist/${filePath}.es.js`,
        format: 'es',
        name: name,
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        sourcemap: 'inline',
      },
    ],
    external: ['react', 'react-dom', 'styletron-react'],
    plugins: [
      progress(),
      nodeResolve(),
      babel({
        babelrc: false,
        presets: [['es2015', {modules: false}], 'stage-1', 'react'],
        plugins: ['external-helpers'],
      }),
      visualizer(),
      filesize(),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/create-react-context/index.js': ['createReactContext'],
        },
      }),
    ],
  };
}

export default [
  {
    input: 'src/index.js',
    ...getSharedConfig({filePath: 'baseui', name: 'baseui'}),
  },
  ...getConfig(),
];
