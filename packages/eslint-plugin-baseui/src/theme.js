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

// This should handle the shared logic for validating a "style function"
// passed to styled, withStyle, or an overrides style property.
//   - Ex: styled('div', () => {})
//   - Ex: withStyle(<Foo />, () => {})
//   - Ex: <Foo overrides={{ Root: { style: () => {} }}} />
// Return true if current node should be flagged, false otherwise.
function lintStyleFunction(context, node) {
  const ancestors = context.getAncestors();
  const scope = context.getScope();
  const themeProperty = deprecatedThemeProperties[node.name];

  const passedToStyledOrWithStyle =
    scope.type === 'function' &&
    scope.block.parent.type === 'CallExpression' &&
    ['styled', 'withStyle'].includes(scope.block.parent.callee.name) &&
    scope.block.parent.arguments[1] === scope.block;

  const passedToOverrides =
    scope.type === 'function' &&
    scope.block.parent.type === 'Property' &&
    scope.block.parent.key.name === 'style' &&
    ancestors.some(
      node => node.type === 'JSXAttribute' && node.name.name === 'overrides',
    );

  if (!passedToStyledOrWithStyle && !passedToOverrides) {
    return false;
  }

  // Only one parameter should be passed to a style function.
  const parameter = scope.block.params[0];

  // Option 1. No destructuring.
  // Ex: props => ({ color: props.$theme.colors.foreground })
  if (parameter.type === 'Identifier') {
    if (
      node.parent.type === 'MemberExpression' &&
      node.parent.object.type === 'MemberExpression' &&
      node.parent.object.property.name === themeProperty.concern &&
      node.parent.object.object.type === 'MemberExpression' &&
      node.parent.object.object.property.name === '$theme' &&
      node.parent.object.object.object.type === 'Identifier' &&
      node.parent.object.object.object.name === parameter.name
    ) {
      // We have verified that the identifier accesses the theme.
      // Ex: props.$theme.colors.foreground
      return true;
    }
  }

  if (parameter.type === 'ObjectPattern') {
    // Our parameter is being destructured.
    const $themeProperty = parameter.properties.find(
      property => property.key.name === '$theme',
    );

    // Option 2. Destructuring $theme in parameters.
    // ({$theme}) => ({ color: $theme.colors.foreground })
    if (
      $themeProperty.value.type === 'Identifier' &&
      $themeProperty.value.name === '$theme'
    ) {
      if (
        node.parent.type === 'MemberExpression' &&
        node.parent.object.type === 'MemberExpression' &&
        node.parent.object.property.name === themeProperty.concern &&
        node.parent.object.object.type === 'Identifier' &&
        node.parent.object.object.name === '$theme'
      ) {
        // We have verified that the identifier accesses $theme.
        // Ex: $theme.colors.foreground
        return true;
      }
    }

    // Account for nested destructuring.
    if ($themeProperty.value.type === 'ObjectPattern') {
      const concernProperty = $themeProperty.value.properties.find(
        property => property.key.name === themeProperty.concern,
      );

      // Option 3. Nested destructuring of a "concern" in parameters.
      // ({$theme: {colors}}) => ({ color: colors.foreground })
      if (
        concernProperty &&
        concernProperty.value.type === 'Identifier' &&
        node.parent.type === 'MemberExpression' &&
        node.parent.object.type === 'Identifier' &&
        node.parent.object.name === themeProperty.concern
      ) {
        // We have verified that the identifier accesses the "concern".
        // Ex: colors.foreground
        return true;
      }

      // Option 4. Nested destructuring of the deprecated theme property.
      // ({$theme: {colors: {foreground}}}) => ({ color: foreground })
      if (concernProperty && concernProperty.value.type === 'ObjectPattern') {
        const deprecatedProperty = concernProperty.value.properties.find(
          property => property.key.name === node.name,
        );
        if (deprecatedProperty) {
          // We have verified that the identifier is destructured in
          // the parameters of this function.

          // Here is a map of the possible destructuring:
          // ({$theme: {colors: {foreground: foreground}}}) => ({ color: foreground })
          //                     ^^^^^^^^^^  ^^^^^^^^^^                  ^^^^^^^^^^
          //                     key         value                       reference

          // Given the above map, here is the final criteria to consider before we flag the node:
          //   - If the current node is the key, we want to flag it.
          //   - If the current node is the value, we ignore it.
          //   - Reaching here means the node is a reference.
          //   - If the current node is part of a member expression, we ignore it. (foo.foreground)
          //   - Finally! We can flag this node.
          if (
            node === deprecatedProperty.key ||
            (node !== deprecatedProperty.value &&
              node.parent.type !== 'MemberExpression')
          ) {
            return true;
          }
        }
      }
    }
  }

  // If we've reached here then we can't flag anything.
  return false;
}

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
        if (
          Object.prototype.hasOwnProperty.call(
            deprecatedThemeProperties,
            node.name,
          )
        ) {
          // We have matched a possible deprecated theme property.
          const deprecatedThemeProperty = deprecatedThemeProperties[node.name];

          // Configure default report options
          const reportOptions = {
            node,
            messageId: MESSAGES.deprecateThemeProperty.id,
            data: {old: node.name},
            fix: null,
          };

          // Update report options if there the property can be replaced.
          if (deprecatedThemeProperty.replacement) {
            reportOptions.messageId = MESSAGES.replaceThemeProperty.id;
            reportOptions.data.new = deprecatedThemeProperty.replacement;
            reportOptions.fix = function(fixer) {
              return fixer.replaceText(
                node,
                deprecatedThemeProperty.replacement,
              );
            };
          }

          // Option 1. Is this node used in the overrides argument for createTheme?

          // Option 2. Is this node used in a "style function" passed to a style utility?
          if (lintStyleFunction(context, node)) {
            context.report(reportOptions);
            return;
          }

          // Option 3. Is this node used in tandem with useStyletron?
        }
      },
    };
  },
};
