import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/baseui.js',
      format: 'umd',
      name: 'baseui',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: 'inline',
    },
    {
      file: 'dist/baseui.es.js',
      format: 'es',
      name: 'baseui',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: 'inline',
    },
  ],
  external: ['react', 'react-dom'],
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
  ],
};
