/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        const match = node.source.value.match(/baseui\/(\w|-)*\//);
        if (match) {
          context.report({
            node,
            message:
              'Please limit imports to "baseui" or one level deep modules such as "baseui/button".' +
              ' Importing more than one level deep is dangerous as source code may change in breaking ways without notice.',
          });
        }
      },
    };
  },
};
