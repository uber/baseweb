/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../src/deprecated-theme-api.js');
const MESSAGES = require('../src/messages.js');

RuleTester.setDefaultConfig({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const tests = {
  valid: [
    // Valid deprecated property used as object property in styled object
    {
      code: `
        const Foo = styled("div", {
          border: "solid 1px black",
        });
      `,
    },

    // Valid deprecated property as object property in styled function
    {
      code: `
        const Foo = styled("div", ({$theme}) => ({
          background: $theme.colors.white,
        }));
      `,
    },

    // Valid deprecated property used from local variable
    {
      code: `
        const foreground = "black";
        const Foo = styled("div", {
          color: foreground,
        });
      `,
    },
  ],
  invalid: [
    // Invalid use of a deprecated theme property via styled
    {
      code: `
        const Foo = styled("div", props => ({
          color: props.$theme.colors.foreground
        }));
      `,
      errors: [{messageId: MESSAGES.replaceThemeProperty.id}],
      output: `
        const Foo = styled("div", props => ({
          color: props.$theme.colors.contentPrimary
        }));
      `,
    },

    // Invalid use of a deprecated theme property via useStyletron
    {
      code: `
        function Foo() {
          const [css, theme] = useStyletron();
          return (
            <div
              className={css({
                color: theme.colors.foreground
              })}
            >
              Foo
            </div>
          );
        }
      `,
      errors: [{messageId: MESSAGES.replaceThemeProperty.id}],
      output: `
        function Foo() {
          const [css, theme] = useStyletron();
          return (
            <div
              className={css({
                color: theme.colors.contentPrimary
              })}
            >
              Foo
            </div>
          );
        }
      `,
    },

    // Invalid use of a deprecated theme property that is partially destructured via styled
    {
      code: `
        const Foo = styled("div", ({ $theme }) => {
          return {
            color: $theme.colors.shadowFocus
          };
        });
      `,
      errors: [{messageId: MESSAGES.deprecateThemeProperty.id}],
    },

    // Invalid use of a deprecated theme property that is partially destructured via withStyle
    {
      code: `
        const Foo = withStyle(Foo, ({ $theme }) => {
          return {
            backgroundColor: $theme.colors.shadowFocus
          };
        });
      `,
      errors: [{messageId: MESSAGES.deprecateThemeProperty.id}],
    },

    // Invalid use of a deprecated theme property that is partially destructured via overrides
    {
      code: `
        function Foo() {
          return (
            <Button
              overrides={{
                Root: {
                  style: ({ $theme }) => {
                    return {
                      color: $theme.colors.shadowFocus
                    };
                  }
                }
              }}
            >
              Foo
            </Button>
          );
        }
      `,
      errors: [{messageId: MESSAGES.deprecateThemeProperty.id}],
    },

    // Invalid use of a deprecated theme property that is partially destructured via styled
    {
      code: `
        const Foo = styled("div", ({ $theme }) => {
          const [colors] = $theme;
          return {
            color: colors.shadowFocus
          };
        });
      `,
      errors: [{messageId: 'deprecateThemeProperty'}],
    },
    {
      code: `
        const Foo = styled("div", ({$theme: {colors: {shadowFocus}}}) => ({
          color: shadowFocus
        }));
      `,
      errors: [
        {messageId: MESSAGES.deprecateThemeProperty.id},
        {messageId: MESSAGES.deprecateThemeProperty.id},
      ],
    },

    // Invalid use of a deprecated theme property that is fully destructured via useStyletron
    {
      code: `
        function Foo() {
          const [
            css,
            {
              colors: { shadowFocus }
            }
          ] = useStyletron();
          return (
            <div
              className={css({
                color: shadowFocus
              })}
            >
              Foo
            </div>
          );
        }
      `,
      errors: [
        {messageId: MESSAGES.deprecateThemeProperty.id},
        {messageId: MESSAGES.deprecateThemeProperty.id},
      ],
    },

    // Invalid use of old typography values
    {
      code: `
        const Foo = styled("div", ({ $theme }) => ({
          ...$theme.typography.font300
        }));
      `,
      errors: [{messageId: MESSAGES.replaceThemeProperty.id}],
      output: `
        const Foo = styled("div", ({ $theme }) => ({
          ...$theme.typography.ParagraphMedium
        }));
      `,
    },

    // Invalid setting deprecated property in createTheme
    {
      code: `
        import { createTheme } from "baseui";
        const theme = createTheme(
          {},
          {
            colors: {
              shadowFocus: "pink"
            }
          }
        );      
      `,
      errors: [{messageId: MESSAGES.deprecateThemeProperty.id}],
    },

    // Invalid within class component method
    {
      code: `
        class Foo extends React.Component {
          render() {
            const Boo = styled('div', ({$theme}) => {
              return {
                backgroundColor: $theme.colors.background
              }
            });
            return <Boo />;
          }
        }
      `,
      errors: [{messageId: MESSAGES.replaceThemeProperty.id}],
    },
  ],
};

// For easier local testing
if (!process.env.CI) {
  let only = [];
  let skipped = [];
  [...tests.valid, ...tests.invalid].forEach(t => {
    if (t.skip) {
      delete t.skip;
      skipped.push(t);
    }
    if (t.only) {
      delete t.only;
      only.push(t);
    }
  });
  const predicate = t => {
    if (only.length > 0) {
      return only.indexOf(t) !== -1;
    }
    if (skipped.length > 0) {
      return skipped.indexOf(t) === -1;
    }
    return true;
  };
  tests.valid = tests.valid.filter(predicate);
  tests.invalid = tests.invalid.filter(predicate);
}

const ruleTester = new RuleTester();
ruleTester.run('deprecated-theme-api', rule, tests);
