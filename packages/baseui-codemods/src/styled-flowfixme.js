/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {withJsFiles} from '@dubstep/core';

import {containsFlowComment, getStyledLocalImportName} from './shared.js';

const FLOW_IGNORE = '$FlowFixMe';

async function styledV7FlowFixme(options: {dir: string}) {
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
              const parent = path.findParent(n => n.isVariableDeclaration());
              if (parent) {
                const comments = parent.node.comments || [];
                if (comments.every(c => !c.value.includes(FLOW_IGNORE))) {
                  comments.push({
                    type: 'CommentLine',
                    value: ' $FlowFixMe',
                    leading: true,
                  });
                  parent.node.comments = comments;
                }
              }
            }
          },
        });
      }
    }
  });
}

export default styledV7FlowFixme;
