/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const MESSAGES = require('./messages.js');

const deprecatedTypographyComponents = [
  {oldName: 'Display', newName: 'DisplayLarge'},
  {oldName: 'Display1', newName: 'DisplayLarge'},
  {oldName: 'Display2', newName: 'DisplayMedium'},
  {oldName: 'Display3', newName: 'DisplaySmall'},
  {oldName: 'Display4', newName: 'DisplayXSmall'},
  {oldName: 'H1', newName: 'HeadingXXLarge'},
  {oldName: 'H2', newName: 'HeadingXLarge'},
  {oldName: 'H3', newName: 'HeadingLarge'},
  {oldName: 'H4', newName: 'HeadingMedium'},
  {oldName: 'H5', newName: 'HeadingSmall'},
  {oldName: 'H6', newName: 'HeadingXSmall'},
  {oldName: 'Paragraph1', newName: 'ParagraphLarge'},
  {oldName: 'Paragraph2', newName: 'ParagraphMedium'},
  {oldName: 'Paragraph3', newName: 'ParagraphSmall'},
  {oldName: 'Paragraph4', newName: 'ParagraphXSmall'},
  {oldName: 'Label1', newName: 'LabelLarge'},
  {oldName: 'Label2', newName: 'LabelMedium'},
  {oldName: 'Label3', newName: 'LabelSmall'},
  {oldName: 'Label4', newName: 'LabelXSmall'},
  {oldName: 'Caption1', newName: 'ParagraphXSmall'},
  {oldName: 'Caption2', newName: 'LabelXSmall'},
];

const getOverrideIfExists = (name, node) => {
  // Verify that an object is passed to overrides.
  if (node.parent.value.expression.type === 'ObjectExpression') {
    // Find property name
    return node.parent.value.expression.properties.find(
      property =>
        property.key && property.key.name && property.key.name === name,
    );
  }
  return null;
};

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
        const fixImport = (oldComponent, newComponent) => {
          context.report({
            node: node.imported,
            messageId: MESSAGES.replace.id,
            data: {
              old: oldComponent,
              new: newComponent,
            },
            fix: function(fixer) {
              return [fixer.replaceText(node.imported, newComponent)];
            },
          });
        };

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

        deprecatedTypographyComponents.forEach(deprecatedApi => {
          if (isImporting(deprecatedApi.oldName, 'baseui/typography')) {
            fixImport(deprecatedApi.oldName, deprecatedApi.newName);
          }
        });

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
          return;
        }

        // successValue
        // Ex: <Checkbox successValue={1} />
        // Replacement: None
        if (
          importState.ProgressBar &&
          isProp('successValue', importState.ProgressBar)
        ) {
          // The prop will be completely removed.
          context.report({
            node: node.parent.value.expression.property,
            messageId: MESSAGES.progressBarSuccessValue.id,
          });
          return;
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
          const property = getOverrideIfExists('Backdrop', node);
          if (property) {
            context.report({
              node: property,
              messageId: MESSAGES.modalBackdrop.id,
            });
            return;
          }
        }

        // Select
        // Ex: <Select overrides={{ SearchIcon: {}}} />
        // Replacement: SearchIconContainer
        if (importState.Select && isProp('overrides', importState.Select)) {
          const property = getOverrideIfExists('SearchIcon', node);
          if (property) {
            context.report({
              node: property,
              messageId: MESSAGES.selectSearchIcon.id,
            });
            return;
          }
        }

        // RadioGroup - All overrides are deprecated except for RadioGroupRoot
        // Ex: <RadioGroup overrides={{ RadioMarkInner: {}}} />
        // Ex: <RadioGroup overrides={{ Description: {}}} />
        // Ex: <RadioGroup overrides={{ Root: {}}} />
        // Replacement: None
        if (
          importState.RadioGroup &&
          isProp('overrides', importState.RadioGroup)
        ) {
          const properties = [
            'Root',
            'Input',
            'Label',
            'Description',
            'RadioMarkInner',
            'RadioMarkOuter',
          ];
          properties.map(val => {
            const property = getOverrideIfExists(val, node);
            if (property) {
              context.report({
                node: property,
                messageId: MESSAGES.radioGroupOverrides.id,
              });
            }
          });
        }

        // =====================
        // Deprecated Components
        // =====================

        // See @ImportSpecifier function for how this importState.Caption1
        // stuff works.

        // Replace deprecated component usage.
        // Caption1
        // Ex: <Caption1 />
        // Replacement: ParagraphXSmall
        deprecatedTypographyComponents.forEach(deprecatedApi => {
          if (
            importState[deprecatedApi.oldName] &&
            isComponent(deprecatedApi.oldName)
          ) {
            context.report({
              node,
              messageId: MESSAGES.replace.id,
              data: {
                old: deprecatedApi.oldName,
                new: deprecatedApi.newName,
              },
              fix: function(fixer) {
                const tags = [fixer.replaceText(node, deprecatedApi.newName)];
                if (node.parent.parent.closingElement) {
                  tags.push(
                    fixer.replaceText(
                      node.parent.parent.closingElement.name,
                      deprecatedApi.newName,
                    ),
                  );
                }
                return tags;
              },
            });
          }
        });
      },
      Identifier(node) {
        const fixIdentifier = (oldComponent, newComponent) => {
          context.report({
            node,
            messageId: MESSAGES.replace.id,
            data: {
              old: oldComponent,
              new: newComponent,
            },
            fix: function(fixer) {
              return [fixer.replaceText(node, newComponent)];
            },
          });
        };
        function isIdentifier(name) {
          return (
            node.name === name &&
            node.type === 'Identifier' &&
            !['ImportSpecifier', 'JSXIdentifier'].includes(node.parent.type)
          );
        }

        deprecatedTypographyComponents.forEach(deprecatedApi => {
          if (
            importState[deprecatedApi.oldName] &&
            isIdentifier(deprecatedApi.oldName)
          ) {
            fixIdentifier(deprecatedApi.oldName, deprecatedApi.newName);
          }
        });
      },
    };
  },
};
