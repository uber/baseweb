/*
Copyright (c) Uber Technologies, Inc.

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
  // They currently have no effect, that is, they are unused in our component code.
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
  rating200: {
    concern: 'colors',
  },
  rating400: {
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

function lintCreateTheme(context, node) {
  // Is createTheme being imported from "baseui"?
  let importSpecifier;

  const program = context
    .getAncestors(node)
    .find(node => node.type === 'Program');
  const importDeclaration = program.body.find(
    node => node.type === 'ImportDeclaration' && node.source.value === 'baseui',
  );

  if (importDeclaration && importDeclaration.specifiers) {
    importSpecifier = importDeclaration.specifiers.find(
      specifier => specifier.imported.name === 'createTheme',
    );
  }

  if (importSpecifier) {
    // Is our current node an object property in an object
    // passed as the second argument to createTheme?
    if (
      node.parent.type === 'Property' &&
      node.parent.parent.type === 'ObjectExpression' &&
      node.parent.parent.parent.type === 'CallExpression' &&
      node.parent.parent.parent.arguments[1] &&
      node.parent.parent.parent.arguments[1] === node.parent.parent &&
      node.parent.parent.parent.callee.name === 'createTheme'
    ) {
      // Yes it is.
      return true;
    }
  }

  // If we've reached here then we can't flag anything.
  return false;
}

function lintStyleFunction(context, node) {
  // This should handle the shared logic for validating a "style function"
  // passed to styled, withStyle, or an overrides style property.
  //   - Ex: styled('div', () => {})
  //   - Ex: withStyle(<Foo />, () => {})
  //   - Ex: <Foo overrides={{ Root: { style: () => {} }}} />
  // Return true if current node should be flagged, false otherwise.

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

  // nothing is passed to the `styled` function
  if (!parameter) {
    return false;
  }

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

    // the styled function is not using the theme
    if (!$themeProperty) {
      return false;
    }

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
      const concernPropertyNode = $themeProperty.value.properties.find(
        property => property.key.name === themeProperty.concern,
      );

      // Option 3. Nested destructuring of a "concern" in parameters.
      // ({$theme: {colors}}) => ({ color: colors.foreground })
      if (
        concernPropertyNode &&
        concernPropertyNode.value.type === 'Identifier' &&
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
      if (
        concernPropertyNode &&
        concernPropertyNode.value.type === 'ObjectPattern'
      ) {
        const deprecatedProperty = concernPropertyNode.value.properties.find(
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

function lintUseStyletron(context, node) {
  // Is there a useStyletron call in our current scope?
  // Is the theme value captured from the call? Ex: const [css, theme] = useStyletron();
  //   - Is the theme value renamed? Ex: const [css, foo] = useStyletron();
  //   - Is the theme destructured? Ex: const [css, {colors}] = useStyletron();
  // Is the current node invoked in a way that uses the theme in scope?
  //   - Ex: Full destructuring: foreground
  //   - Ex: Concern destructuring: colors.foreground

  // const ancestors = context.getAncestors();
  const scope = context.getScope();
  const themeProperty = deprecatedThemeProperties[node.name];

  if (scope.type === 'function' && scope.block.body.body) {
    // Find all the variable declarations in the function body.
    const declarations = scope.block.body.body.filter(
      statement => statement.type === 'VariableDeclaration',
    );

    // Map of variable declaration types and properties:
    // const [css, theme] = useStyletron()
    //       ^..........^                  .id (ArrayPattern)
    //                      ^............^ .init (CallExpression)
    //       ^...........................^ VariableDeclarator
    // ^.................................^ VariableDeclaration

    // Search each declaration for a declarator that invokes
    // useStyletron as the initial value. This declarator
    // will have all the information we need.
    let declarator;
    declarations.forEach(declaration => {
      declarator = declaration.declarations.find(
        declarator =>
          declarator.type === 'VariableDeclarator' &&
          declarator.init &&
          declarator.init.type === 'CallExpression' &&
          declarator.init.callee.name === 'useStyletron',
      );
    });

    if (!declarator) {
      return false;
    }

    if (
      declarator.id.type === 'ArrayPattern' &&
      declarator.id.elements.length === 2
    ) {
      // Confirm we are accessing the theme index in the returned array.
      // Ex: const [css, theme] = useStyletron();
      // Ex: const [css, {colors}] = useStyletron();
      const themeIndexNode = declarator.id.elements[1];

      if (themeIndexNode.type === 'Identifier') {
        // This implies we are not destructuring the theme object (here at least).
        const localThemeObjectName = themeIndexNode.name;
        if (
          node.parent.type === 'MemberExpression' &&
          node.parent.object.type === 'MemberExpression' &&
          node.parent.object.property.name === themeProperty.concern &&
          node.parent.object.object.type === 'Identifier' &&
          node.parent.object.object.name === localThemeObjectName
        ) {
          // We have verified that the identifier accesses the theme.
          // Ex: theme.colors.foreground
          return true;
        }
      }

      if (themeIndexNode.type === 'ObjectPattern') {
        // Our theme object is being destructured.

        // Check if we are destructuring the theme concern.
        // Ex: const [css, {colors}] = useStyletron();
        // Ex: const [css, {colors: foo}] = useStyletron();
        const concernPropertyNode = themeIndexNode.properties.find(
          property => property.key.name === themeProperty.concern,
        );

        // TODO(refactor): check if lintStyleFunction can also use this:
        // > node.parent.object.name === concernPropertyNode.value.name

        if (
          concernPropertyNode &&
          // Ensure we are not destructuring further
          concernPropertyNode.value.type === 'Identifier' &&
          node.parent.type === 'MemberExpression' &&
          node.parent.object.type === 'Identifier' &&
          node.parent.object.name === concernPropertyNode.value.name
        ) {
          // We have verified that the identifier accesses the "concern".
          // Ex: colors.foreground
          return true;
        }

        if (
          concernPropertyNode &&
          concernPropertyNode.value.type === 'ObjectPattern'
        ) {
          // We are destructuring even further!

          // Check if we are destructuring the deprecated property in question.
          // Ex: const [css, {colors: {foreground}}] = useStyletron();
          // Ex: const [css, {colors: {foreground: foo}}] = useStyletron();
          const deprecatedProperty = concernPropertyNode.value.properties.find(
            property => property.key.name === node.name,
          );

          // TODO(refactor): The conditional below is pretty confusing.
          // We should break it up a bit. Also it is exactly the same as
          // the final destructuring logic in lintStyleFunction...
          if (
            deprecatedProperty &&
            (node === deprecatedProperty.key ||
              (node !== deprecatedProperty.value &&
                node.parent.type !== 'MemberExpression'))
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
          if (lintCreateTheme(context, node)) {
            context.report(reportOptions);
            return;
          }

          // Option 2. Is this node used in a "style function" passed to a style utility?
          if (lintStyleFunction(context, node)) {
            context.report(reportOptions);
            return;
          }

          // Option 3. Is this node used in tandem with useStyletron?
          if (lintUseStyletron(context, node)) {
            context.report(reportOptions);
            return;
          }
        }
      },
    };
  },
};
