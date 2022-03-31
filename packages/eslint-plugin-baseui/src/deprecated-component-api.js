/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */

'use strict';

const MESSAGES = require('./messages.js');

const mapDeprecatedTypographyComponents = {
  Display: 'DisplayLarge',
  Display1: 'DisplayLarge',
  Display2: 'DisplayMedium',
  Display3: 'DisplaySmall',
  Display4: 'DisplayXSmall',
  H1: 'HeadingXXLarge',
  H2: 'HeadingXLarge',
  H3: 'HeadingLarge',
  H4: 'HeadingMedium',
  H5: 'HeadingSmall',
  H6: 'HeadingXSmall',
  Paragraph1: 'ParagraphLarge',
  Paragraph2: 'ParagraphMedium',
  Paragraph3: 'ParagraphSmall',
  Paragraph4: 'ParagraphXSmall',
  Label1: 'LabelLarge',
  Label2: 'LabelMedium',
  Label3: 'LabelSmall',
  Label4: 'LabelXSmall',
  Caption1: 'ParagraphXSmall',
  Caption2: 'LabelXSmall',
};

const getOverrideIfExists = (name, node) => {
  // Verify that an object is passed into overrides.
  if (node.parent.value.expression.type === 'ObjectExpression') {
    // Find property name
    return node.parent.value.expression.properties.find(
      (property) => property.key && property.key.name && property.key.name === name
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
      [MESSAGES.buttonKindMinimal.id]: MESSAGES.buttonKindMinimal.message,
      [MESSAGES.modalBackdrop.id]: MESSAGES.modalBackdrop.message,
    },
  },
  create(context) {
    let importState = {};
    const identifiersToRename = {};
    const fixImport = (node, oldComponent, newComponent) => {
      context.report({
        node: node.imported,
        messageId: MESSAGES.replace.id,
        data: {
          old: oldComponent,
          new: newComponent,
        },
        fix: function (fixer) {
          return [fixer.replaceText(node.imported, newComponent)];
        },
      });
    };
    const removeImport = (node, specifierIndex, oldName, newName) => {
      context.report({
        node,
        messageId: MESSAGES.replace.id,
        data: {
          old: oldName,
          new: newName,
        },
        fix: function (fixer) {
          const isAtStart = specifierIndex === 0;
          const startIndex = isAtStart ? specifierIndex : specifierIndex - 1;
          const endIndex = isAtStart ? specifierIndex + 1 : specifierIndex;
          return fixer.removeRange([
            node.specifiers[startIndex].range[isAtStart ? 0 : 1],
            node.specifiers[endIndex].range[isAtStart ? 0 : 1],
          ]);
        },
      });
    };

    return {
      ImportDeclaration(node) {
        if (!node.source.value.startsWith('baseui/')) {
          return;
        }

        function isImporting(node, importName, importPath) {
          if (node.imported.name === importName && node.parent.source.value === importPath) {
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
            // Spinner
            // Ex: import {Spinner} from "baseui/spinner";
            // Note, we are not replacing Spinner because the new API
            // is not compatible.
            if (isImporting(specifier, 'Spinner', 'baseui/spinner')) {
              context.report({
                node: specifier.imported,
                messageId: MESSAGES.deprecateSpinner.id,
              });
              return;
            }

            // These can be referenced later on by instances of components.
            if (isImporting(specifier, 'Accordion', 'baseui/accordion')) return;
            if (isImporting(specifier, 'Modal', 'baseui/modal')) return;
            if (isImporting(specifier, 'Checkbox', 'baseui/checkbox')) return;
            if (isImporting(specifier, 'Button', 'baseui/button')) return;

            // removes return statement since these can be imported together
            isImporting(specifier, 'Radio', 'baseui/radio');
            isImporting(specifier, 'RadioGroup', 'baseui/radio');
          }
        }

        if (node.source.value !== 'baseui/typography') {
          return;
        }

        const existingImports = {};

        // Map existing imports (newName: localName), preference given to first renamed import.
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportNamespaceSpecifier') {
            return;
          }
          const currentImportedName = specifier.imported.name;
          if (existingImports[currentImportedName]) {
            if (
              currentImportedName !== specifier.local.name &&
              existingImports[currentImportedName] === currentImportedName
            ) {
              existingImports[currentImportedName] = specifier.local.name;
            }
          } else {
            existingImports[currentImportedName] = specifier.local.name;
          }
        });

        const specifiers = node.specifiers || [];
        specifiers.forEach((specifier, specifierIndex) => {
          if (specifier.type === 'ImportNamespaceSpecifier') {
            return;
          }
          const deprecatedComponent = specifier.imported.name;
          const newComponent = mapDeprecatedTypographyComponents[deprecatedComponent];

          if (newComponent) {
            const isAlreadyImported = Boolean(existingImports[newComponent]);
            const isRenamed = specifier.local.name !== specifier.imported.name;

            if (isAlreadyImported) {
              removeImport(node, specifierIndex, deprecatedComponent, newComponent);
              identifiersToRename[specifier.local.name] = existingImports[newComponent];
            } else {
              fixImport(specifier, deprecatedComponent, newComponent);
              if (!isRenamed) {
                identifiersToRename[specifier.local.name] = newComponent;
              }
            }
          }
        });
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
                (ancestor) =>
                  ancestor.type === 'JSXOpeningElement' && ancestor.name.name === component
              )
          );
        }

        // isComponent
        // Check if identifier is a component.
        // Ex: isComponent() with <Boo foo={} /> => true
        function isComponent() {
          return (
            node.parent.type === 'JSXOpeningElement' || node.parent.type === 'JSXClosingElement'
          );
        }

        // ================
        // Deprecated Props
        // ================

        // renderPanelContent
        // Ex: <Accordion renderPanelContent />
        // Replacement: renderAll
        if (importState.Accordion && isProp('renderPanelContent', importState.Accordion)) {
          context.report({
            node,
            messageId: MESSAGES.replace.id,
            data: {
              old: 'renderPanelContent',
              new: 'renderAll',
            },
            fix: function (fixer) {
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
            fix: function (fixer) {
              return fixer.replaceText(node, 'autoFocus');
            },
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
        if (importState.Checkbox && isProp('checkmarkType', importState.Checkbox)) {
          // The value can be a constant or a string literal.
          // We need to handle each a little differently.
          if (node.parent.value.type === 'Literal' && node.parent.value.value === 'toggle') {
            // Ex: <Checkmark checkmarkType="toggle" />
            context.report({
              node: node.parent.value,
              messageId: MESSAGES.replace.id,
              data: {
                old: `toggle`,
                new: `toggle_round`,
              },
              fix: function (fixer) {
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
              fix: function (fixer) {
                return fixer.replaceText(node.parent.value.expression.property, 'toggle_round');
              },
            });
            return;
          }
        }

        // Checkbox - isError
        // Ex: <Checkbox isError />
        // Replacement: error
        if (importState.Checkbox && isProp('isError', importState.Checkbox)) {
          context.report({
            node: node,
            messageId: MESSAGES.replace.id,
            data: {
              old: `isError`,
              new: `error`,
            },
            fix: function (fixer) {
              return fixer.replaceText(node, 'error');
            },
          });
          return;
        }

        // Radio - isError
        // Ex: <Radio isError />
        // Replacement: error
        if (importState.Radio && isProp('isError', importState.Radio)) {
          context.report({
            node: node,
            messageId: MESSAGES.replace.id,
            data: {
              old: `isError`,
              new: `error`,
            },
            fix: function (fixer) {
              return fixer.replaceText(node, 'error');
            },
          });
          return;
        }

        // RadioGroup - isError
        // Ex: <RadioGroup isError />
        // Replacement: error
        if (importState.RadioGroup && isProp('isError', importState.RadioGroup)) {
          context.report({
            node: node,
            messageId: MESSAGES.replace.id,
            data: {
              old: `isError`,
              new: `error`,
            },
            fix: function (fixer) {
              return fixer.replaceText(node, 'error');
            },
          });
          return;
        }

        // kind
        // Ex: <Button kind="minimal" />
        // Ex: <Button kind={KIND.minimal} />
        // Replacement: tertiary
        if (importState.Button && isProp('kind', importState.Button)) {
          // The value can be a constant or a string literal.
          // We need to handle each a little differently.
          if (node.parent.value.type === 'Literal' && node.parent.value.value === 'minimal') {
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

        // RadioGroup - All overrides are deprecated except for RadioGroupRoot
        // Ex: <RadioGroup overrides={{ RadioMarkInner: {}}} />
        // Ex: <RadioGroup overrides={{ Description: {}}} />
        // Ex: <RadioGroup overrides={{ Root: {}}} />
        // Replacement: None
        if (importState.RadioGroup && isProp('overrides', importState.RadioGroup)) {
          const properties = [
            'Root',
            'Input',
            'Label',
            'Description',
            'RadioMarkInner',
            'RadioMarkOuter',
          ];
          properties.map((val) => {
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
        if (Object.prototype.hasOwnProperty.call(identifiersToRename, node.name) && isComponent()) {
          const oldName = node.name;
          const newName = identifiersToRename[node.name];
          context.report({
            node,
            messageId: MESSAGES.replace.id,
            data: {
              old: oldName,
              new: newName,
            },
            fix: function (fixer) {
              return [fixer.replaceText(node, newName)];
            },
          });
        }
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
            fix: function (fixer) {
              return [fixer.replaceText(node, newComponent)];
            },
          });
        };
        function isIdentifier() {
          return (
            node.type === 'Identifier' &&
            !['ImportSpecifier', 'JSXIdentifier'].includes(node.parent.type)
          );
        }

        if (
          Object.prototype.hasOwnProperty.call(identifiersToRename, node.name) &&
          isIdentifier()
        ) {
          fixIdentifier(node.name, identifiersToRename[node.name]);
        }
      },
    };
  },
};
