/* eslint-env node */
// @flow

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
            decl.init.arguments[0] &&
            decl.init.arguments[0].value.includes('e2e/helpers')
          ) {
            console.log(alreadyAddedRequire, file);
            path.insertBefore(
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.objectPattern([
                    t.objectProperty(t.identifier('expect'), t.identifier('expect')),
                    t.objectProperty(t.identifier('test'), t.identifier('test')),
                  ]),
                  t.callExpression(t.identifier('require'), [t.identifier('@playwright/test')])
                ),
              ])
            );
          }
        }
      },
    });
  });
}

puppeteerToPlaywright(process.cwd());
