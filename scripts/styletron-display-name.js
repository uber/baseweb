/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */

const {
  t,
  withJsFiles,
  findFiles,
  parseJs,
  readFile,
  writeFile,
  generateJs,
} = require('@dubstep/core');

const moduleNames = ['styled', 'withStyle', 'withStyleDeep'];

async function styletronDisplayName(wd) {
  const files = await findFiles(`${wd}/**/table-grid/styled-components.tsx`);

  for (const file of files) {
    console.log(`visiting file: ${file}`);
    const code = await readFile(file);
    const program = parseJs(code, { mode: 'typescript' });

    program.traverse({
      ImportDeclaration(path) {
        const sourceName = path.get('source').node.value;
        if (!sourceName.endsWith('styles')) {
          return;
        }

        path.get('specifiers').forEach((specifier) => {
          const localPath = specifier.get('local');
          const localName = localPath.node.name;

          if (!localPath.scope.bindings[localName]) {
            return;
          }

          const refPaths = localPath.scope.bindings[localName].referencePaths;
          if (t.isImportSpecifier(specifier)) {
            // import {moduleName} from 'packageName';
            const specifierName = specifier.get('imported').node.name;
            if (moduleNames.includes(specifierName)) {
              // refsHandler(t, state, refPaths, specifierName);

              refPaths.forEach((path) => {
                if (path.parentPath.type === 'CallExpression') {
                  if (path.parentPath.parentPath.type === 'VariableDeclarator') {
                    const name = path.parentPath.parentPath.node.id;
                    path.parentPath.parentPath.parentPath.insertAfter(
                      t.expressionStatement(
                        t.assignmentExpression(
                          '=',
                          t.memberExpression(name, t.identifier('displayName')),
                          t.stringLiteral(name.name)
                        )
                      )
                    );
                  }
                }
              });
            } else if (t.isImportNamespaceSpecifier(specifier)) {
              // import * as pkg from 'packageName';
              // TODO(#5): Handle this case, or issue a warning because this may not be 100% robust
            }
          }
        });
      },
    });

    const generated = generateJs(program);
    await writeFile(file, generated);
  }
}

styletronDisplayName(process.cwd());
