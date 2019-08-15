#!/usr/bin/env node
/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {gzipSync} = require('zlib');
const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const Terser = require('terser');

function modulePath(identifier) {
  // the format of module paths is
  //   '(<loader expression>!)?/path/to/module.js'
  let loaderRegex = /.*!/;
  return identifier.replace(loaderRegex, '');
}

function getByteLen(normal_val) {
  // Force string type
  normal_val = String(normal_val);

  var byteLen = 0;
  for (var i = 0; i < normal_val.length; i++) {
    var c = normal_val.charCodeAt(i);
    byteLen +=
      c < 1 << 7
        ? 1
        : c < 1 << 11
        ? 2
        : c < 1 << 16
        ? 3
        : c < 1 << 21
        ? 4
        : c < 1 << 26
        ? 5
        : c < 1 << 31
        ? 6
        : Number.NaN;
  }
  return byteLen;
}

function minify(source) {
  return Terser.minify(source, {
    mangle: false,
    compress: {
      arrows: true,
      booleans: true,
      collapse_vars: true,
      comparisons: true,
      conditionals: true,
      dead_code: true,
      drop_console: false,
      drop_debugger: true,
      ecma: 5,
      evaluate: true,
      expression: false,
      global_defs: {},
      hoist_vars: false,
      ie8: false,
      if_return: true,
      inline: true,
      join_vars: true,
      keep_fargs: true,
      keep_fnames: false,
      keep_infinity: false,
      loops: true,
      negate_iife: true,
      passes: 1,
      properties: true,
      pure_getters: 'strict',
      pure_funcs: null,
      reduce_vars: true,
      sequences: true,
      side_effects: true,
      switches: true,
      top_retain: null,
      toplevel: false,
      typeofs: true,
      unsafe: false,
      unused: true,
      warnings: false,
    },
    output: {
      comments: false,
    },
  });
}

function getDependencySizes(stats) {
  let statsTree = {
    packageName: '<root>',
    sources: [],
    children: [],
  };

  if (stats.name) {
    statsTree.bundleName = stats.name;
  }

  if (!stats.modules) return [];

  // extract source path for each module
  let modules = [];
  const makeModule = mod => {
    // Uglifier cannot minify a json file, hence we need
    // to make it valid javascript syntax
    const isJSON = mod.identifier.endsWith('.json');
    const source = isJSON ? `$a$=${mod.source}` : mod.source;

    return {
      path: modulePath(mod.identifier),
      sources: [source],
      source: source,
    };
  };

  stats.modules
    .filter(mod => !mod.name.startsWith('external'))
    .forEach(mod => {
      if (mod.modules) {
        mod.modules.forEach(subMod => {
          modules.push(makeModule(subMod));
        });
      } else {
        modules.push(makeModule(mod));
      }
    });

  modules.sort((a, b) => {
    if (a === b) {
      return 0;
    } else {
      return a < b ? -1 : 1;
    }
  });

  modules.forEach(mod => {
    let packages = mod.path.split(
      new RegExp('\\' + path.sep + 'node_modules\\' + path.sep),
    );
    if (packages.length > 1) {
      let lastSegment = packages.pop();
      let lastPackageName = '';
      if (lastSegment[0] === '@') {
        // package is a scoped package
        let offset = lastSegment.indexOf(path.sep) + 1;
        lastPackageName = lastSegment.slice(
          0,
          offset + lastSegment.slice(offset).indexOf(path.sep),
        );
      } else {
        lastPackageName = lastSegment.slice(0, lastSegment.indexOf(path.sep));
      }
      packages.push(lastPackageName);
    }
    packages.shift();

    let parent = statsTree;
    parent.sources.push(mod.source);
    packages.forEach(pkg => {
      let existing = parent.children.filter(child => child.packageName === pkg);
      if (existing.length > 0) {
        existing[0].sources.push(mod.source);
        parent = existing[0];
      } else {
        let newChild = {
          path: mod.path,
          packageName: pkg,
          sources: [mod.source],
          children: [],
        };
        parent.children.push(newChild);
        parent = newChild;
      }
    });
  });

  const results = statsTree.children
    .map(treeItem => ({
      ...treeItem,
      sources: treeItem.sources.filter(source => !!source),
    }))
    .filter(treeItem => treeItem.sources.length)
    .map(treeItem => {
      const size = treeItem.sources.reduce((acc, source) => {
        const uglifiedSource = minify(source);

        if (uglifiedSource.error) {
          throw new Error('Uglifying failed' + uglifiedSource.error);
        }

        return acc + getByteLen(gzipSync(uglifiedSource.code));
      }, 0);

      return {
        name: treeItem.packageName,
        approximateSize: size,
      };
    });

  return results;
}

function makeWebpackConfig({entryPoint}) {
  return {
    entry: {
      main: entryPoint,
    },
    mode: 'production',
    optimization: {
      namedChunks: true,
      runtimeChunk: {
        name: 'runtime',
      },
    },
    resolve: {
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'import-glob',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'file-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      pathinfo: false,
    },
  };
}

const memoryFileSystem = new MemoryFS();

function compile({path}) {
  const compiler = webpack(
    makeWebpackConfig({
      entryPoint: path,
    }),
  );

  compiler.outputFileSystem = memoryFileSystem;

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);
      resolve(stats);
    });
  });
}

async function getStatsForComponent(component) {
  const stats = await compile({
    path: path.join(__dirname, `../src/${component}/index.js`),
  });

  let jsonStats = stats
    ? stats.toJson({
        assets: true,
        children: false,
        chunks: false,
        chunkGroups: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: true,
        errorDetails: false,
        entrypoints: false,
        reasons: false,
        maxModules: 500,
        performance: false,
        source: true,
        depth: true,
        providedExports: true,
        warnings: false,
        modulesSort: 'depth',
      })
    : {};

  const bundleContents = memoryFileSystem.readFileSync(
    path.join(__dirname, '../dist/main.bundle.js'),
    'utf-8',
  );
  const size = jsonStats.assets.filter(x => x.name === 'main.bundle.js').pop()
    .size;
  const dependencySizes = getDependencySizes(jsonStats);

  const minified = minify(bundleContents);

  const gzip = gzipSync(minified.code, {});

  const gzippedSize = getByteLen(gzip);

  return {
    size,
    dependencySizes,
    gzip: gzippedSize,
    minified: getByteLen(minified.code),
  };
}

function compare(original, current) {
  const components = Object.keys(current);

  for (let i = 0; i < components.length; i += 1) {
    const originalSize = original[components[i]].size;
    const currentSize = current[components[i]].size;

    console.log(
      `Size of ${components[i]}: ${currentSize} bytes. On master, it is ${originalSize} bytes`,
    );

    const ratio = currentSize / originalSize;
    if (ratio > 1.1 || ratio < 0.9) {
      console.error(`This size of ${components[i]} changed signifcantly`);
      console.error(
        'If this is expected, rerun this command with the environment variable FORCE_UPDATE=true',
      );
      process.exit(-1);
    }
  }
}

async function main() {
  const original = require('../component-sizes.json');
  const blacklistFolders = [
    'test',
    'template-component',
    'utils',
    'styles',
    'themes',
    'codemods',
    'helpers',
    'a11y',
    'layout',
  ];

  const components = fs
    .readdirSync(path.join(__dirname, '../src'))
    .filter(name => !name.includes('.') && !blacklistFolders.includes(name));

  const data = {};

  for (let i = 0; i < components.length; i += 1) {
    data[components[i]] = await getStatsForComponent(components[i]);
  }

  if (process.env.FORCE_UPDATE) {
    const filePath = path.join(__dirname, '../component-sizes.json');

    fs.unlinkSync(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } else {
    compare(original, data);
  }
}

main().catch(console.error);
