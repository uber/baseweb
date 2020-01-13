/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const MESSAGES = require('./messages.js');

const deprecatedThemeProperties = {
  // These are deprecated semantic colors.
  // They may still be used in component code in a few instances,
  // but they will be replaced in an upcoming major version.
  // Developers can instead use the new semantic tokens:
  // https://baseweb.design/guides/theming/#colors
  colorPrimary: {
    concern: 'colors',
    replacement: 'contentPrimary',
  },
  colorSecondary: {
    concern: 'colors',
    replacement: 'contentSecondary',
  },
  background: {
    concern: 'colors',
    replacement: 'backgroundPrimary',
  },
  backgroundAlt: {
    concern: 'colors',
    replacement: 'backgroundSecondary',
  },
  backgroundInv: {
    concern: 'colors',
    replacement: 'backgroundInversePrimary',
  },
  foreground: {
    concern: 'colors',
    replacement: 'contentPrimary',
  },
  foregroundAlt: {
    concern: 'colors',
    replacement: 'contentSecondary',
  },
  foregroundInv: {
    concern: 'colors',
    replacement: 'contentInversePrimary',
  },
  border: {
    concern: 'colors',
    replacement: 'borderOpaque',
  },
  borderAlt: {
    concern: 'colors',
    replacement: 'borderTransparent',
  },
  borderFocus: {
    concern: 'colors',
    replacement: 'borderSelected',
  },
  borderError: {
    concern: 'colors',
    replacement: 'borderNegative',
  },
  shadowFocus: {
    concern: 'colors',
  },
  shadowError: {
    concern: 'colors',
  },
  // These are all component specific color properties.
  // They currently have no effect, that is, they are unsued in our component code.
  // They will be removed in the next major version of baseweb.
  datepickerBackground: {
    concern: 'colors',
  },
  datepickerDayFont: {
    concern: 'colors',
  },
  datepickerDayFontDisabled: {
    concern: 'colors',
  },
  datepickerDayPseudoSelected: {
    concern: 'colors',
  },
  datepickerDayPseudoHighlighted: {
    concern: 'colors',
  },
  calendarDayBackgroundPseudoSelected: {
    concern: 'colors',
  },
  listIconFill: {
    concern: 'colors',
  },
  listBorder: {
    concern: 'colors',
  },
  progressStepsIconActiveFill: {
    concern: 'colors',
  },
  sliderTrackFillSelected: {
    concern: 'colors',
  },
  sliderTrackFillSelectedHover: {
    concern: 'colors',
  },
  sliderTrackFillSelectedActive: {
    concern: 'colors',
  },
  sliderHandleFill: {
    concern: 'colors',
  },
  sliderHandleFillHover: {
    concern: 'colors',
  },
  sliderHandleFillActive: {
    concern: 'colors',
  },
  sliderHandleFillSelected: {
    concern: 'colors',
  },
  sliderHandleFillSelectedHover: {
    concern: 'colors',
  },
  sliderHandleFillSelectedActive: {
    concern: 'colors',
  },
  sliderHandleFillDisabled: {
    concern: 'colors',
  },
  sliderBorder: {
    concern: 'colors',
  },
  sliderBorderHover: {
    concern: 'colors',
  },
  sliderBorderDisabled: {
    concern: 'colors',
  },
  notificationPrimaryBackground: {
    concern: 'colors',
  },
  notificationPrimaryText: {
    concern: 'colors',
  },
  paginationTriangleDown: {
    concern: 'colors',
  },
  headerNavigationFill: {
    concern: 'colors',
  },
  tagLightDisabledRampUnit: {
    concern: 'colors',
  },
  tagOutlinedDisabledRampUnit: {
    concern: 'colors',
  },
  toastPrimaryBackground: {
    concern: 'colors',
  },
  // These are marked as deprecated in baseweb:src/theme.ts.
  // Strangely, they are not in baseweb:src/themes/types.js, so I'm not sure where they came from.
  // Adding them here in case someone, somewhere is using them.
  tagBackground: {
    concern: 'colors',
  },
  tagNeutralBackground: {
    concern: 'colors',
  },
  tagPrimaryBackground: {
    concern: 'colors',
  },
  tagPositiveBackground: {
    concern: 'colors',
  },
  tagWarningBackground: {
    concern: 'colors',
  },
  tagNegativeBackground: {
    concern: 'colors',
  },
  tagRGBGradient: {
    concern: 'colors',
  },
  tagRGBGradientSecondary: {
    concern: 'colors',
  },
  // These are our old typography properties.
  // They have been aliased with newer values like ParagraphMedium and DisplayLarge.
  // These are preferable as they align with design specs.
  font100: {
    concern: 'typography',
    replacement: 'ParagraphXSmall',
  },
  font150: {
    concern: 'typography',
    replacement: 'LabelXSmall',
  },
  font200: {
    concern: 'typography',
    replacement: 'ParagraphSmall',
  },
  font250: {
    concern: 'typography',
    replacement: 'LabelSmall',
  },
  font300: {
    concern: 'typography',
    replacement: 'ParagraphMedium',
  },
  font350: {
    concern: 'typography',
    replacement: 'LabelMedium',
  },
  font400: {
    concern: 'typography',
    replacement: 'ParagraphLarge',
  },
  font450: {
    concern: 'typography',
    replacement: 'LabelLarge',
  },
  font550: {
    concern: 'typography',
    replacement: 'HeadingXSmall',
  },
  font650: {
    concern: 'typography',
    replacement: 'HeadingSmall',
  },
  font750: {
    concern: 'typography',
    replacement: 'HeadingMedium',
  },
  font850: {
    concern: 'typography',
    replacement: 'HeadingLarge',
  },
  font950: {
    concern: 'typography',
    replacement: 'HeadingXLarge',
  },
  font1050: {
    concern: 'typography',
    replacement: 'HeadingXXLarge',
  },
  font1150: {
    concern: 'typography',
    replacement: 'DisplayXSmall',
  },
  font1250: {
    concern: 'typography',
    replacement: 'DisplaySmall',
  },
  font1350: {
    concern: 'typography',
    replacement: 'DisplayMedium',
  },
  font1450: {
    concern: 'typography',
    replacement: 'DisplayLarge',
  },
};

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      [MESSAGES.deprecateThemeProperty.id]:
        MESSAGES.deprecateThemeProperty.message,
      [MESSAGES.replaceThemeProperty.id]: MESSAGES.replaceThemeProperty.message,
    },
  },
  create(context) {
    return {
      Identifier(node) {
        const identifier = node.name;

        // We use `hasOwnProperty`, otherwise we might get false positives on the prototype chain.
        if (
          Object.prototype.hasOwnProperty.call(
            deprecatedThemeProperties,
            identifier,
          )
        ) {
          // We have found an identifier that matches one of our deprecated theme properties.
          const sourceCode = context.getSourceCode();
          const scope = context.getScope(node);
          const data = {
            old: identifier,
          };
          let fix = null;
          let messageId = MESSAGES.deprecateThemeProperty.id;

          // If there is a possible replacement for this deprecated property,
          // add a fix to replace with a new semantic property.
          // TODO: use `suggest` instead, currently not supported in VSCode extension:
          // https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions
          // https://github.com/microsoft/vscode-eslint/issues/806
          if (deprecatedThemeProperties[identifier].replacement) {
            messageId = MESSAGES.replaceThemeProperty.id;
            data.new = deprecatedThemeProperties[identifier].replacement;
            fix = function(fixer) {
              return fixer.replaceText(
                node,
                deprecatedThemeProperties[identifier].replacement,
              );
            };
          }

          // Check if we are setting a property in createTheme:overrides
          // Ex: createTheme({}, {datepickerBackground: "pink"});
          if (
            context
              .getAncestors()
              .some(
                node =>
                  node.type === 'CallExpression' &&
                  node.callee.name === 'createTheme',
              ) &&
            node.parent.type === 'Property' &&
            node === node.parent.key
          ) {
            // A deprecated property is being set in createTheme.
            // Assuming a violation.
            context.report({
              node,
              messageId,
              data,
              fix,
            });
            return;
          }

          // Exit early if we are not in a function.
          // We don't have access to the theme outside of functions.
          // Ex: styled, withStyle, overrides, function component (useStyletron)
          if (scope.type !== 'function') {
            return;
          }

          // Exit early if the identifier is a key in an object expression
          // Ex: { background: $theme.colors.white }
          if (
            node.parent.type === 'Property' &&
            node.parent.parent.type === 'ObjectExpression' &&
            node === node.parent.key
          ) {
            return;
          }

          // Exit early if identifier is a value in an object destructuing pattern
          // Ex: ({$theme: {colors: {background}}}) => {}
          //  - background will match twice, as both a key and as a value, so we skip the value match
          if (
            node.parent.type === 'Property' &&
            node.parent.parent.type === 'ObjectPattern' &&
            node === node.parent.value
          ) {
            return;
          }

          // Check if our identifier is accessing properties on a theme, $theme, or its theme concern.
          // Ex: theme.colors.foreground
          // Ex: props.$theme.colors.foreground
          // Ex: colors.foreground
          if (node.parent.type === 'MemberExpression') {
            const expressionText = sourceCode.getText(node.parent);
            if (
              expressionText.search('theme.') ||
              expressionText.search(
                deprecatedThemeProperties[identifier].concern,
              )
            ) {
              // Expression accesses properties on a theme, $theme, or colors object.
              // Assuming a violation.
              context.report({
                node,
                messageId,
                data,
                fix,
              });
              return;
            }
          }

          // Check if our identifier was fully destructured from a $theme object.
          // Ex: styled('div', ({$theme: {colors: {background}}}) => {})
          scope.block.params.forEach(param => {
            if (
              param.type === 'ObjectPattern' &&
              param.properties.some(property => property.key.name === '$theme')
            ) {
              // The object destructuring includes a $theme key.
              // Assuming a violation.
              context.report({
                node,
                messageId,
                data,
                fix,
              });
              return;
            }
          });

          // Check if our identifier was fully destructured from a useStyletron call.
          // Ex: const [css, {colors: {background}}] = useStyletron();
          if (scope.block.body.body) {
            scope.block.body.body.forEach(b => {
              if (b.type === 'VariableDeclaration') {
                const declarationText = sourceCode.getText(b);
                if (
                  declarationText.search('useStyletron()') &&
                  declarationText.search(identifier)
                ) {
                  // We've found a declaration that includes our identifier and a useStyletron call.
                  // Assuming a violation.
                  context.report({
                    node,
                    messageId,
                    data,
                    fix,
                  });
                  return;
                }
              }
            });
          }
        }
      },
    };
  },
};
