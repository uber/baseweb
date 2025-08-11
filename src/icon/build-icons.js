#!/usr/bin/env node

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node*/
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function pascalCase(str) {
  return str.split('-').map(capitalize).join('');
}

function titleCase(str) {
  return str.split('-').map(capitalize).join(' ');
}

// handle the exception from Chevrons, where we do not want the word Chevron in the title
function removeChevronFromTitle(str) {
  return str.replace('Chevron ', '');
}

// transform svg string to properly styled jsx
function reactify(svgString) {
  let previous;
  do {
    previous = svgString;
    svgString = svgString.replace(/<!--.*-->\n/gm, '');
  } while (svgString !== previous);
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
  const allJsFiles = fs.readdirSync(path.resolve(__dirname)).filter((f) => f.endsWith('.js'));
  allJsFiles.forEach((f) => {
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
  const iconTemplate = fs.readFileSync(path.resolve(__dirname, './icon-template.txt'), 'utf8');
  const svgs = fs.readdirSync(path.resolve(__dirname, './svg')).filter((f) => f.endsWith('.svg'));

  const prettierOptions = (await prettier.resolveConfig(__dirname)) || {};
  const iconExports = [];

  svgs.forEach(async (svgFilename) => {
    const svgFile = svgFilename.split('.')[0];
    const componentName = pascalCase(svgFile);
    iconExports.push(`export {default as ${componentName}} from './${svgFile}';`);

    const svgFileContents = fs.readFileSync(
      path.resolve(__dirname, `./svg/${svgFilename}`),
      'utf8'
    );

    const title = removeChevronFromTitle(titleCase(svgFile));
    const viewboxRegex = svgFileContents.match(/viewBox="([^"]+)"/);
    let viewBox = null;
    if (viewboxRegex && viewboxRegex[1]) {
      viewBox = viewboxRegex[1];
    }

    let result = iconTemplate
      .replace('%%ICON_PATH%%', reactify(svgFileContents))
      .replace(new RegExp('%%ICON_NAME%%', 'g'), componentName)
      .replace(new RegExp('%%SVG_TITLE%%', 'g'), title)
      .replace(
        new RegExp('%%SVG_VIEWBOX%%', 'g'),
        viewBox && viewboxRegex[1] ? `viewBox="${viewBox}"` : ''
      );

    fs.writeFileSync(
      path.resolve(__dirname, `./${svgFile}.tsx`),
      prettier.format(result, { parser: 'typescript', ...prettierOptions })
    );
  });

  fs.writeFileSync(
    path.resolve(__dirname, `./icon-exports.ts`),
    `/*\nCopyright (c) Uber Technologies, Inc.\n\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.\n*/\n${iconExports.join(
      '\n'
    )}\n`
  );

  // eslint-disable-next-line no-console
  console.log(`Wrote ${svgs.length} icon(s)`);
}

cleanOldIcons();
generateNewIcons();
