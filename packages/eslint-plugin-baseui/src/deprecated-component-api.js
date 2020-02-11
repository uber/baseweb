/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const MESSAGES = require('./messages.js');

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [MESSAGES.replace.id]: MESSAGES.replace.message,
    },
  },
  create(context) {
    return {
      JSXIdentifier(node) {
        // =======
        // Helpers
        // =======

        // isProp
        // Check if identifier is a prop with matching "name" and is used with "component".
        // Ex: prop("foo", "Boo") with <Boo foo={} /> => true
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

        // isComponent
        // Check if identifier is a component matching "name".
        // Ex: prop("foo", "Boo") with <Boo foo={} /> => true
        function isComponent(name) {
          return node.name === name && node.parent.type === 'JSXOpeningElement';
        }

        // ================
        // Deprecated Props
        // ================

        // renderPanelContent
        // Ex: <Accordion renderPanelContent />
        // Replacement: renderAll
        if (isProp('renderPanelContent', 'Accordion')) {
          context.report({
            node,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'renderPanelContent',
              new: 'renderAll',
            },
            fix: function(fixer) {
              return fixer.replaceText(node, 'renderAll');
            },
          });
          return;
        }

        // autofocus
        // Ex: <Modal autofocus />
        // Replacement: autoFocus
        if (isProp('autofocus', 'Modal')) {
          context.report({
            node: node,
            messageId: MESSAGES.replace.id,
            data: {
              old: `autofocus`,
              new: `autoFocus`,
            },
            fix: function(fixer) {
              return fixer.replaceText(node, 'autoFocus');
            },
          });
          return;
        }

        // style and $style
        // Ex: <Block style={{ ... }} />
        // Ex: <Block $style={{ ... }} />
        // The "$style" and "style" props are not supported.
        // It works because Block spreads props down to the base
        // styled component, but styles are not guaranteed to be applied
        // as expected.
        const isProp_$style = isProp('$style', 'Block');
        const isProp_style = isProp('style', 'Block');
        if (isProp_$style || isProp_style) {
          context.report({
            node,
            message: `The "${
              isProp_$style ? '$style' : 'style'
            }" prop is not supported on the "Block" component. Please use "overrides.Block" to pass styles down to the root element.`,
          });
        }

        // ======================
        // Deprecated Prop Values
        // ======================

        // checkmarkType
        // Ex: <Checkbox checkmarkType="toggle" />
        // Ex: <Checkbox checkmarkType={STYLE_TYPE.toggle} />
        // Replacement: toggle_round
        if (isProp('checkmarkType', 'Checkbox')) {
          // The value can be a constant or a string literal.
          // We need to handle each a little differently.
          if (
            node.parent.value.type === 'Literal' &&
            node.parent.value.value === 'toggle'
          ) {
            // Ex: <Checkmark checkmarkType="toggle" />
            context.report({
              node: node.parent.value,
              messageId: MESSAGES.replace.id,
              data: {
                old: `toggle`,
                new: `toggle_round`,
              },
              fix: function(fixer) {
                return fixer.replaceText(node.parent.value, `"toggle_round"`);
              },
            });
          } else if (
            node.parent.value.type === 'JSXExpressionContainer' &&
            node.parent.value.expression.type === 'MemberExpression' &&
            node.parent.value.expression.object.name === 'STYLE_TYPE' &&
            node.parent.value.expression.property.name === 'toggle'
          ) {
            // Ex: <Checkmark checkmarkType={STYLE_TYPE.toggle} />
            context.report({
              node: node.parent.value.expression.property,
              messageId: MESSAGES.replace.id,
              data: {
                old: `STYLE_TYPE.toggle`,
                new: `STYLE_TYPE.toggle_round`,
              },
              fix: function(fixer) {
                return fixer.replaceText(
                  node.parent.value.expression.property,
                  'toggle_round',
                );
              },
            });
            return;
          }
        }

        // kind
        // Ex: <Button kind="minimal" />
        // Ex: <Button kind={KIND.minimal} />
        // Replacement: tertiary
        if (isProp('kind', 'Button')) {
          // The value can be a constant or a string literal.
          // We need to handle each a little differently.
          if (
            node.parent.value.type === 'Literal' &&
            node.parent.value.value === 'minimal'
          ) {
            // Ex: <Button kind="minimal" />
            context.report({
              node: node.parent.value,
              message: `The "minimal" option for the Button "kind" prop is deprecated in favor of "tertiary". In v10 of baseui, "minimal" will be removed.`,
            });
            return;
          } else if (
            node.parent.value.type === 'JSXExpressionContainer' &&
            node.parent.value.expression.type === 'MemberExpression' &&
            node.parent.value.expression.object.name === 'KIND' &&
            node.parent.value.expression.property.name === 'minimal'
          ) {
            // Ex: <Button kind={KIND.minimal} />
            context.report({
              node: node.parent.value.expression.property,
              message: `The "KIND.minimal" option for the Button "kind" prop is deprecated in favor of "KIND.tertiary". In v10 of baseui, "KIND.minimal" will be removed.`,
            });
            return;
          }
        }

        // ====================
        // Deprecated overrides
        // ====================

        // Backdrop
        // Ex: <Modal overrides={{ Backdrop: {}}} />
        // Replacement: DialogContainer
        if (isProp('overrides', 'Modal')) {
          // Verify that an object is passed to overrides.
          if (node.parent.value.expression.type === 'ObjectExpression') {
            // Find object property with "Backdrop" as key.
            const property = node.parent.value.expression.properties.find(
              property => property.key.name === 'Backdrop',
            );
            if (property) {
              context.report({
                node: property,
                message: `"Backdrop" has been deprecated as an override property. In v10 of baseui, "Backdrop" will be removed in favor of "DialogContainer".`,
              });
              return;
            }
          }
        }

        // =====================
        // Deprecated Components
        // =====================

        // Spinner
        // Ex: <Spinner />
        // Replacement: SpinnerNext
        // Note, we are not replacing Spinner because the APIs are slightly different.
        // We can't swap the components in a way 100% safe way.
        if (isComponent('Spinner')) {
          context.report({
            node: node,
            message: `The "Spinner" component has been deprecated in favor of "StyledSpinnerNext". In v10 of baseui, "Spinner" will be removed and "StyledSpinnerNext" will be renamed to "Spinner".`,
          });
          return;
        }

        // Caption1
        // Ex: <Caption1 />
        // Replacement: ParagraphXSmall
        if (isComponent('Caption1')) {
          // Find import of Caption1
          const program = context
            .getAncestors(node)
            .find(node => node.type === 'Program');
          const importDeclaration = program.body.find(
            node =>
              node.type === 'ImportDeclaration' &&
              node.source.value === 'baseui/typography',
          );
          const importSpecifier = importDeclaration.specifiers.find(
            specifier => specifier.imported.name === 'Caption1',
          );

          context.report({
            node: node,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'Caption1',
              new: 'ParagraphXSmall',
            },
            fix: function(fixer) {
              return [
                fixer.replaceText(importSpecifier.imported, 'ParagraphXSmall'),
                fixer.replaceText(node, 'ParagraphXSmall'),
                fixer.replaceText(
                  node.parent.parent.closingElement.name,
                  'ParagraphXSmall',
                ),
              ];
            },
          });
          return;
        }

        // Caption2
        // Ex: <Caption2 />
        // Replacement: LabelXSmall
        if (isComponent('Caption2')) {
          // Find import of Caption2
          const program = context
            .getAncestors(node)
            .find(node => node.type === 'Program');
          const importDeclaration = program.body.find(
            node =>
              node.type === 'ImportDeclaration' &&
              node.source.value === 'baseui/typography',
          );
          const importSpecifier = importDeclaration.specifiers.find(
            specifier => specifier.imported.name === 'Caption2',
          );

          context.report({
            node: node,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'Caption2',
              new: 'LabelXSmall',
            },
            fix: function(fixer) {
              return [
                fixer.replaceText(importSpecifier.imported, 'LabelXSmall'),
                fixer.replaceText(node, 'LabelXSmall'),
                fixer.replaceText(
                  node.parent.parent.closingElement.name,
                  'LabelXSmall',
                ),
              ];
            },
          });
          return;
        }
      },
    };
  },
};
