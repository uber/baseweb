/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */

'use strict';
const {hasProp} = require('jsx-ast-utils');
const MESSAGES = require('./messages.js');

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [MESSAGES.noClassName.id]: MESSAGES.noClassName.message,
    },
  },
  create(context) {
    let importState = {};

    return {
      ImportDeclaration(node) {
        if (!node.source.value.startsWith('baseui/')) {
          return;
        }
        // Keep track of all things imported. Later in the jsx, we'll determine if it's a component (JSXIdentifiers should only be components).
        for (let x = 0; x < node.specifiers.length; x++) {
          const specifier = node.specifiers[x];
          if (
            specifier.type !== 'ImportNamespaceSpecifier' &&
            specifier.type !== 'ImportDefaultSpecifier'
          ) {
            importState[specifier.local.name] = true;
          }
        }
      },
      JSXOpeningElement(node) {
        // ================
        // Warn when using `className` with baseui components,
        // as it can cause conflicts and unintended styling.
        // ================
        // className
        // Ex: <Block className={css({...})} />, <Button className={css({...})} />
        if (
          importState[node.name.name] &&
          hasProp(node.attributes, 'className')
        ) {
          context.report({
            node,
            messageId: MESSAGES.noClassName.id,
            data: {
              component: node.name.name,
            },
          });
        }
      },
    };
  },
};
