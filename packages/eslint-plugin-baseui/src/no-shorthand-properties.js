/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */

'use strict';
const { hasProp } = require('jsx-ast-utils');
const MESSAGES = require('./messages.js');

const SHORTHAND_PROPERTIES = [
  'background',
  'border',
  'borderBottom',
  'borderTop',
  'borderLeft',
  'borderRight',
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'flex',
  'margin',
  'outline',
  'padding',
  'transform',
  'transition',
];

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [MESSAGES.noShorthandProperties.id]: MESSAGES.noShorthandProperties.message,
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
        if (importState[node.name.name] && hasProp(node.attributes, 'overrides')) {
          const overrides = node.attributes
            // JsxSpreadAttribute {...foo} does not have a name parameter
            .filter((attr) => attr.name && attr.name.name === 'overrides')
            .pop();
          if (
            !overrides ||
            !overrides.value ||
            !overrides.value.expression ||
            overrides.value.expression.type !== 'ObjectExpression'
          ) {
            return;
          }
          const expression = overrides.value.expression;
          const nodesToScan = [...expression.properties];
          while (nodesToScan.length > 0) {
            const property = nodesToScan.shift();
            if (property.value) {
              if (property.value.type === 'ObjectExpression') {
                nodesToScan.push(...property.value.properties);
              } else if (property.value.type === 'ArrowFunctionExpression') {
                nodesToScan.push(...property.value.body.properties);
              } else if (property.value.type === 'FunctionExpression') {
                const returnArg = property.value.body.body[property.value.body.body.length - 1];
                nodesToScan.push(...returnArg.argument.properties);
              }
            }
            if (
              property.type === 'Property' &&
              property.key &&
              property.value &&
              property.value.type !== 'ObjectExpression'
            ) {
              if (SHORTHAND_PROPERTIES.includes(property.key.name)) {
                context.report({
                  node: property,
                  messageId: MESSAGES.noShorthandProperties.id,
                });
              }
            }
          }
        }
      },
    };
  },
};
