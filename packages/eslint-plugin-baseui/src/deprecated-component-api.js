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
      [MESSAGES.deprecateSpinner.id]: MESSAGES.deprecateSpinner.message,
      [MESSAGES.styleOnBlock.id]: MESSAGES.styleOnBlock.message,
      [MESSAGES.buttonKindMinimal.id]: MESSAGES.buttonKindMinimal.message,
      [MESSAGES.modalBackdrop.id]: MESSAGES.modalBackdrop.message,
    },
  },
  create(context) {
    let importState = {};
    return {
      ImportSpecifier(node) {
        function isImporting(importName, importPath) {
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

        // Spinner
        // Ex: import {Spinner} from "baseui/spinner";
        // Note, we are not replacing Spinner because the new API
        // is not compatible.
        if (isImporting('Spinner', 'baseui/spinner')) {
          context.report({
            node: node.imported,
            messageId: MESSAGES.deprecateSpinner.id,
          });
          return;
        }

        // For Caption1 and Caption2, we want to potentially replace instances
        // of the component. We need to consider imports as well as instances
        // so that if people use the autofix flag, they don't end up with a
        // weird half-way fix. If we find a valid import here, we capture in
        // `importState` what the `new` value to use when we rename instances
        // later on. One consequence of this approach is that you have to fix
        // the import and instance separately if resolving lint warnings
        // manually.

        if (isImporting('Caption1', 'baseui/typography')) {
          context.report({
            node: node.imported,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'Caption1',
              new: 'ParagraphXSmall',
            },
            fix: function(fixer) {
              return [fixer.replaceText(node.imported, 'ParagraphXSmall')];
            },
          });
          return;
        }

        if (isImporting('Caption2', 'baseui/typography')) {
          context.report({
            node: node.imported,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'Caption2',
              new: 'LabelXSmall',
            },
            fix: function(fixer) {
              return [fixer.replaceText(node.imported, 'LabelXSmall')];
            },
          });
          return;
        }

        // These can be referenced later on by instances of components.
        if (isImporting('Accordion', 'baseui/accordion')) return;
        if (isImporting('Modal', 'baseui/modal')) return;
        if (isImporting('Block', 'baseui/block')) return;
        if (isImporting('Checkbox', 'baseui/checkbox')) return;
        if (isImporting('Button', 'baseui/button')) return;
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

        // isComponent
        // Check if identifier is a component matching "name".
        // Ex: isComponent("Boo") with <Boo foo={} /> => true
        function isComponent(name) {
          return node.name === name && node.parent.type === 'JSXOpeningElement';
        }

        // ================
        // Deprecated Props
        // ================

        // renderPanelContent
        // Ex: <Accordion renderPanelContent />
        // Replacement: renderAll
        if (
          importState.Accordion &&
          isProp('renderPanelContent', importState.Accordion)
        ) {
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
        if (importState.Modal && isProp('autofocus', importState.Modal)) {
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
        if (
          importState.Block &&
          (isProp('$style', importState.Block) ||
            isProp('style', importState.Block))
        ) {
          context.report({
            node,
            messageId: MESSAGES.styleOnBlock.id,
          });
        }

        // ======================
        // Deprecated Prop Values
        // ======================

        // checkmarkType
        // Ex: <Checkbox checkmarkType="toggle" />
        // Ex: <Checkbox checkmarkType={STYLE_TYPE.toggle} />
        // Replacement: toggle_round
        if (
          importState.Checkbox &&
          isProp('checkmarkType', importState.Checkbox)
        ) {
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
        if (importState.Button && isProp('kind', importState.Button)) {
          // The value can be a constant or a string literal.
          // We need to handle each a little differently.
          if (
            node.parent.value.type === 'Literal' &&
            node.parent.value.value === 'minimal'
          ) {
            // Ex: <Button kind="minimal" />
            context.report({
              node: node.parent.value,
              messageId: MESSAGES.buttonKindMinimal.id,
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
              messageId: MESSAGES.buttonKindMinimal.id,
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
        if (importState.Modal && isProp('overrides', importState.Modal)) {
          // Verify that an object is passed to overrides.
          if (node.parent.value.expression.type === 'ObjectExpression') {
            // Find object property with "Backdrop" as key.
            const property = node.parent.value.expression.properties.find(
              property =>
                property.key &&
                property.key.name &&
                property.key.name === 'Backdrop',
            );
            if (property) {
              context.report({
                node: property,
                messageId: MESSAGES.modalBackdrop.id,
              });
              return;
            }
          }
        }

        // =====================
        // Deprecated Components
        // =====================

        // See @ImportSpecifier function for how this importState.Caption1
        // stuff works.

        // Caption1
        // Ex: <Caption1 />
        // Replacement: ParagraphXSmall
        if (importState.Caption1 && isComponent('Caption1')) {
          context.report({
            node,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'Caption1',
              new: 'ParagraphXSmall',
            },
            fix: function(fixer) {
              return [
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
        if (importState.Caption2 && isComponent('Caption2')) {
          context.report({
            node,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'Caption2',
              new: 'LabelXSmall',
            },
            fix: function(fixer) {
              return [
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
