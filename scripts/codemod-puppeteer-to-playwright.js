/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { t, withJsFiles } = require('@dubstep/core');

async function puppeteerToPlaywright(wd) {
  await withJsFiles(`${wd}/**/__tests__/*.e2e.js`, async (program, file) => {
    console.log(`visiting file: ${file}`);

    let alreadyAddedRequire = false;
    program.traverse({
      CallExpression: (path) => {
        if (
          path.node.callee.name === 'require' &&
          path.node.arguments.length === 1 &&
          path.node.arguments[0].value === '@playwright/test'
        ) {
          alreadyAddedRequire = true;
        }

        if (path.node.callee.type === 'Identifier') {
          if (path.node.callee.name === 'it') {
            path.node.callee.name = 'test';

            if (path.node.arguments.length === 2) {
              const callback = path.node.arguments[1];

              if (callback.type === 'ArrowFunctionExpression') {
                path.node.arguments[1] = t.arrowFunctionExpression(
                  [
                    t.objectPattern([
                      t.objectProperty(t.identifier('page'), t.identifier('page'), false, true),
                    ]),
                  ],
                  callback.body,
                  true
                );
              }
            }
          }

          if (
            ['describe', 'beforeAll', 'afterAll', 'beforeEach', 'afterEach'].includes(
              path.node.callee.name
            )
          ) {
            path.node.callee = t.memberExpression(
              t.identifier('test'),
              t.identifier(path.node.callee.name)
            );
          }
        }
      },
    });

    // find page.xyz calls
    program.traverse({
      VariableDeclaration: (path) => {
        if (path.node.declarations.length === 1) {
          const decl = path.node.declarations[0];
          if (
            decl.init.type === 'CallExpression' &&
            decl.init.callee.name === 'require' &&
            decl.init.arguments.length === 1 &&
            typeof decl.init.arguments[0].value === 'string' &&
            decl.init.arguments[0].value.includes('e2e/helpers')
          ) {
            if (!alreadyAddedRequire) {
              path.insertAfter(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.objectPattern([
                      t.objectProperty(t.identifier('expect'), t.identifier('expect'), false, true),
                      t.objectProperty(t.identifier('test'), t.identifier('test'), false, true),
                    ]),
                    t.callExpression(t.identifier('require'), [t.stringLiteral('@playwright/test')])
                  ),
                ])
              );
            }
          }
        }
      },
    });
  });
}

puppeteerToPlaywright(process.cwd());
