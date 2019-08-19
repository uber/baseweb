/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node */

const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

const fs = require('fs').promises;
const globby = require('globby');
const path = require('path');

// returns TypeNode[]
// type TypeNode = {
//   name: string,
//   lineStart: number,
//   children?: TypeNode[],
// };

// --- input ---
// // @flow
// type PropsT = {
//   a: string,
//   b: number,
// }
//
// --- output ---
// [
//   {
//     name: 'PropsT',
//     lineStart: 2,
//     types: [
//       {
//         name: 'a',
//         lineStart: 3,
//         children: [],
//       },
//       {
//         name: 'b',
//         lineStart: 4,
//         children: [],
//       }
//     ],
//   }
// ]

function parseFileToOutline(code: string) {
  const types = [];
  const ast = parse(code, {sourceType: 'module', plugins: ['flow']});
  traverse(ast, {
    ExportNamedDeclaration(path) {
      if (t.isTypeAlias(path.node.declaration)) {
        const typeNode = {
          name: path.node.declaration.id.name,
          lineStart: path.node.declaration.id.loc.start.line,
          children: [],
        };

        if (t.isObjectTypeAnnotation(path.node.declaration.right)) {
          typeNode.children = path.node.declaration.right.properties.map(
            property => {
              if (t.isObjectTypeProperty(property)) {
                if (t.isLiteral(property.key)) {
                  return {
                    name: property.key.value,
                    lineStart: property.loc.start.line,
                  };
                } else if (t.isIdentifier(property.key)) {
                  return {
                    name: property.key.name,
                    lineStart: property.loc.start.line,
                  };
                }
              } else if (t.isObjectTypeSpreadProperty(property)) {
                return {
                  name: property.argument.id.name,
                  lineStart: property.loc.start.line,
                };
              }
            },
          );
        }
        types.push(typeNode);
      }
    },
  });
  return types;
}

// type Outline = {file: string, definitions: TypeNode[]};
async function generateCheatSheet() {
  const outlines = [];

  const filepaths = await globby(['src/**/types.js']);
  await Promise.all(
    filepaths.map(async file => {
      const from = path.join(__dirname, '../', file);
      const source = await fs.readFile(from, 'utf-8');
      const definitions = parseFileToOutline(source);
      outlines.push({file, definitions});
    }),
  );

  const content = `
    const outlines = ${JSON.stringify(outlines)};
    export default outlines;
  `;

  await fs.writeFile(
    `${process.cwd()}/documentation-site/cheat-sheet.js`,
    content,
  );
}

module.exports = {
  parseFileToOutline,
  generateCheatSheet,
};
