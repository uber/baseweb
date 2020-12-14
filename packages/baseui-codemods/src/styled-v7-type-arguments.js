/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as t from '@babel/types';
import {withJsFiles} from '@dubstep/core';

import {containsFlowComment, getStyledLocalImportName} from './shared.js';

function isStyledElement(path) {
  return (
    path.node.arguments &&
    path.node.arguments.length &&
    path.node.arguments[0].type === 'StringLiteral'
  );
}

function isStyledComponent(path) {
  return (
    path.node.arguments &&
    path.node.arguments.length &&
    path.node.arguments[0].type === 'Identifier'
  );
}

async function styledV7TypeArguments(options: {dir: string}) {
  await withJsFiles(`${options.dir}/**/*.js`, async p => {
    if (containsFlowComment(p)) {
      const styledLocalImportName = getStyledLocalImportName(p);
      if (styledLocalImportName) {
        p.traverse({
          CallExpression(path) {
            if (
              path.node.callee.name === styledLocalImportName &&
              !path.node.typeArguments
            ) {
              if (path.node.arguments.length === 1) {
                path.node.arguments.push(t.objectExpression([]));
              }

              if (isStyledElement(path)) {
                if (!t.isObjectExpression(path.node.arguments[1])) {
                  path.node.callee.typeAnnotation = t.typeParameterInstantiation(
                    [t.anyTypeAnnotation()],
                  );
                }
              } else if (isStyledComponent(path)) {
                const base = path.node.arguments[0];
                if (!t.isObjectExpression(path.node.arguments[1])) {
                  path.node.callee.typeAnnotation = t.typeParameterInstantiation(
                    [
                      t.typeofTypeAnnotation(t.genericTypeAnnotation(base)),
                      t.anyTypeAnnotation(),
                    ],
                  );
                } else {
                  path.node.callee.typeAnnotation = t.typeParameterInstantiation(
                    [t.typeofTypeAnnotation(t.genericTypeAnnotation(base))],
                  );
                }
              }
            }
          },
        });
      }
    }
  });
}

export default styledV7TypeArguments;
