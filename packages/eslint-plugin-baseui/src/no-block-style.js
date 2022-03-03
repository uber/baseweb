/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';
const {hasAnyProp} = require('jsx-ast-utils');
const MESSAGES = require('./messages.js');

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [MESSAGES.styleOnBlock.id]: MESSAGES.styleOnBlock.message,
    },
  },
  create(context) {
    let importState = {};

    return {
      ImportDeclaration(node) {
        if (!node.source.value.startsWith('baseui/')) {
          return;
        }

        function isImporting(node, importName, importPath) {
          if (
            node.imported.name === importName &&
            node.parent.source.value === importPath
          ) {
            importState[importName] = node.local.name;
            return true;
          } else {
            return false;
          }
        }

        for (let x = 0; x < node.specifiers.length; x++) {
          const specifier = node.specifiers[x];
          if (
            specifier.type !== 'ImportNamespaceSpecifier' &&
            specifier.type !== 'ImportDefaultSpecifier'
          ) {
            if (isImporting(specifier, 'Block', 'baseui/block')) return;
          }
        }
      },
      JSXOpeningElement(node) {
        // style and $style
        // Ex: <Block style={{ ... }} />
        // Ex: <Block $style={{ ... }} />
        // The "$style" and "style" props are not supported.
        // It works because Block spreads props down to the base
        // styled component, but styles are not guaranteed to be applied
        // as expected.
        if (
          importState.Block &&
          node.name.name === importState.Block &&
          hasAnyProp(node.attributes, ['$style', 'style'])
        ) {
          context.report({
            node,
            messageId: MESSAGES.styleOnBlock.id,
          });
        }
      },
    };
  },
};
