#!/usr/bin/env node

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node*/
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pascalCase(str: string): string {
  return str
    .split('-')
    .map(capitalize)
    .join('');
}

function titleCase(str: string): string {
  return str
    .split('-')
    .map(capitalize)
    .join(' ');
}

// transform svg string to properly styled jsx
function reactify(svgString: string): string {
  return svgString
    .replace(/<\/?svg[^>]*>/gm, '')
    .replace(/^\s*\n/gm, '')
    .replace(/\n$/, '')
    .replace(/\t/g, '  ')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/fill-opacity/g, 'fillOpacity')
    .trim();
}

function cleanOldIcons() {
  const allJsFiles = fs
    .readdirSync(path.resolve(__dirname))
    .filter(f => f.endsWith('.js'));
  allJsFiles.forEach(f => {
    if (
      fs
        .readFileSync(path.resolve(__dirname, f), 'utf8')
        .match(/^\/\/ BASEUI-GENERATED-REACT-ICON/m)
    ) {
      fs.unlinkSync(path.resolve(__dirname, f));
    }
  });
}

async function generateNewIcons() {
  const iconTemplate = fs.readFileSync(
    path.resolve(__dirname, './icon-template.txt'),
    'utf8',
  );
  const svgs = fs
    .readdirSync(path.resolve(__dirname, './svg'))
    .filter(f => f.endsWith('.svg'));

  const prettierOptions = (await prettier.resolveConfig(__dirname)) || {};
  const iconExports = [];

  svgs.forEach(async svgFilename => {
    const svgFile = svgFilename.split('.')[0];
    const componentName = pascalCase(svgFile);
    iconExports.push(
      `export {default as ${componentName}} from './${svgFile}';`,
    );

    const svgFileContents = fs.readFileSync(
      path.resolve(__dirname, `./svg/${svgFilename}`),
      'utf8',
    );

    const iconProps = [`title="${titleCase(svgFile)}"`];

    const viewBox = svgFileContents.match(/viewBox="[^"]+"/);
    if (viewBox) {
      iconProps.push(viewBox[0]);
    }

    let result = iconTemplate
      .replace('%%ICON_NAME%%', componentName)
      .replace('%%ICON_PROPS%%', iconProps.join(' '))
      .replace('%%ICON_PATH%%', reactify(svgFileContents));

    fs.writeFileSync(
      path.resolve(__dirname, `./${svgFile}.js`),
      prettier.format(result, {parser: 'babylon', ...prettierOptions}),
    );
  });

  fs.writeFileSync(
    path.resolve(__dirname, `./icon-exports.js`),
    `// @flow\n${iconExports.join('\n')}\n`,
  );

  // eslint-disable-next-line no-console
  console.log(`Wrote ${svgs.length} icon(s)`);
}

cleanOldIcons();
generateNewIcons();
