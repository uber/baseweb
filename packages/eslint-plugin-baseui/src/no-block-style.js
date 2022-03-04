/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const MESSAGES = require('./messages.js');

module.exports = {
  meta: {
    type: 'suggestion',
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
      JSXIdentifier(node) {
        // =======
        // Helpers
        // =======

        // isProp
        // Check if identifier is a prop with matching "name" and is used with
        // "component".
        // Ex: isProp("foo", "Boo") with <Boo foo={} /> => true
        function isProp(name, component) {
          return (
            node.name === name &&
            context
              .getAncestors()
              .some(
                ancestor =>
                  ancestor.type === 'JSXOpeningElement' &&
                  ancestor.name.name === component,
              )
          );
        }

        // style and $style
        // Ex: <Block style={{ ... }} />
        // Ex: <Block $style={{ ... }} />
        // The "$style" and "style" props are not supported.
        // It works because Block spreads props down to the base
        // styled component, but styles are not guaranteed to be applied
        // as expected.
        if (
          importState.Block &&
          (isProp('$style', importState.Block) ||
            isProp('style', importState.Block))
        ) {
          context.report({
            node,
            messageId: MESSAGES.styleOnBlock.id,
          });
          return;
        }
      },
    };
  },
};
