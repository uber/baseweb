/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const {RuleTester} = require('eslint');
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
    {
      code: `
        // TODO(should-fail)
        // style function - destructure elsewhere in function
        styled('div', ({$theme}) => {
          const {colors} = $theme;
          return {
            color: colors.foreground,
          };
        });
      `,
    },
    {
      code: `
        // TODO(should-fail)
        // style function - using deprecated property in a nested function
        styled('div', props => {
          const foo = () => props.$theme.colors.foreground;
          return {
            color: foo(),
          };
        });
      `,
    },
    {
      code: `
        // TODO(should-fail)
        // overrides - object defined elsewhere
        const fooOverrides = {
          Root: {
            style: ({$theme}) => ({ color: $theme.colors.foreground }),
          },
        };
        export default () => <Foo overrides={fooOverrides} />;
      `,
    },
    {
      code: `
        // TODO(should-fail)
        // useStyletron - direct array access, who would do this though?
        function Foo({ children }) {
          const boo = useStyletron()
          return (
            <div className={boo[0]({ color: boo[1].colors.foreground })}>{children}</div>
          )
        }
      `,
    },
    {
      code: `
        // TODO(should-fail)
        // useStyletron - destructure elsewhere in function
        function Foo({ children }) {
          const [css, theme] = useStyletron()
          const {colors} = theme;
          return (
            <div className={css({ color: colors.foreground })}>{children}</div>
          )
        }
      `,
    },
    {
      code: `
        // TODO(should-fail)
        // createTheme - not passing an object literal
        import {createTheme} from "baseui"
        const primitives = {};
        const overrides = { foreground: "#000" };
        const theme = createTheme(primitives, overrides);
      `,
    },
    {
      code: `
        // style function - using deprecated property on another object
        styled('div', props => {
          const foo = something.foreground;
          return {
            color: props.$theme.colors.primary,
          };
        });
      `,
    },
    {
      code: `
        // style function - renaming a valid property to one of our deprecated properties
        styled('div', ({$theme: {colors: {foo: foreground}}}) => {
          return {
            color: foreground,
          };
        });
      `,
    },
    {
      code: `
        // createTheme - not imported from baseui
        function createTheme() {}
        const theme = createTheme({}, { foreground: "#000" });
      `,
    },
    {
      code: `
        // createTheme - no overrides at all
        import {createTheme} from "baseui"
        const theme = createTheme();
      `,
    },
    {
      code: `
        const ExploreAdvancedSidebar = styled('div', ({$isShowingTopNav, $isVisible}) => ({
          background: 'white',
        }));
      `,
    },
    {
      code: `
        <Slider
          overrides={{
            InnerTrack: {
              style: () => {
                return {
                  background: red,
                };
              },
            },
          }}
        />
      `,
    },
    {
      code: `
        export function Tag(props: Props) {
          const [useCss, theme] = useStyletron();

          let someVarWithoutInit;

          const paramRowStyle = useCss({
            display: 'flex',
            flexWrap: 'wrap',
            ...theme.typography.font200,
          });
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        // styled - no destructuring
        styled('div', props => {
          return {
            color: props.$theme.colors.foreground,
          };
        });
      `,
      output: `
        // styled - no destructuring
        styled('div', props => {
          return {
            color: props.$theme.colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // withStyle - no destructuring
        withStyle(<Foo />, props => {
          return {
            color: props.$theme.colors.foreground,
          };
        });
      `,
      output: `
        // withStyle - no destructuring
        withStyle(<Foo />, props => {
          return {
            color: props.$theme.colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // styled - $theme destructured
        styled('div', ({ $theme }) => {
          return {
            color: $theme.colors.foreground,
          };
        });
      `,
      output: `
        // styled - $theme destructured
        styled('div', ({ $theme }) => {
          return {
            color: $theme.colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // withStyle - $theme destructured
        withStyle(<Foo />, ({ $theme }) => {
          return {
            color: $theme.colors.foreground,
          };
        });
      `,
      output: `
        // withStyle - $theme destructured
        withStyle(<Foo />, ({ $theme }) => {
          return {
            color: $theme.colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // styled - nested destructuring for "concern"
        styled('div', ({ $theme: {colors} }) => {
          return {
            color: colors.foreground,
          };
        });
      `,
      output: `
        // styled - nested destructuring for "concern"
        styled('div', ({ $theme: {colors} }) => {
          return {
            color: colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // withStyle - nested destructuring for "concern"
        withStyle(<Foo />, ({ $theme: {colors} }) => {
          return {
            color: colors.foreground,
          };
        });
      `,
      output: `
        // withStyle - nested destructuring for "concern"
        withStyle(<Foo />, ({ $theme: {colors} }) => {
          return {
            color: colors.contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // styled - nested destructuring of the deprecated theme property
        styled('div', ({ $theme: {colors: {foreground}} }) => {
          return {
            color: foreground,
          };
        });
      `,
      output: `
        // styled - nested destructuring of the deprecated theme property
        styled('div', ({ $theme: {colors: {contentPrimary}} }) => {
          return {
            color: contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // withStyle - nested destructuring of the deprecated theme property
        withStyle(<Foo />, ({ $theme: {colors: {foreground}} }) => {
          return {
            color: foreground,
          };
        });
      `,
      output: `
        // withStyle - nested destructuring of the deprecated theme property
        withStyle(<Foo />, ({ $theme: {colors: {contentPrimary}} }) => {
          return {
            color: contentPrimary,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // styled - renaming a nested & destructured & deprecated theme property
        styled('div', ({$theme: {colors: {foreground: foo}}}) => {
          return {
            color: foo,
          };
        });
      `,
      output: `
        // styled - renaming a nested & destructured & deprecated theme property
        styled('div', ({$theme: {colors: {contentPrimary: foo}}}) => {
          return {
            color: foo,
          };
        });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // overrides - no destructuring
        export default () => (
          <Foo
            overrides={{
              Root: { style: props => ({ color: props.$theme.colors.foreground }) }
            }}
          />
        )
      `,
      output: `
        // overrides - no destructuring
        export default () => (
          <Foo
            overrides={{
              Root: { style: props => ({ color: props.$theme.colors.contentPrimary }) }
            }}
          />
        )
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // overrides - $theme destructured
        export default () => (
          <Foo
            overrides={{
              Root: { style: ({$theme}) => ({ color: $theme.colors.foreground }) }
            }}
          />
        )
      `,
      output: `
        // overrides - $theme destructured
        export default () => (
          <Foo
            overrides={{
              Root: { style: ({$theme}) => ({ color: $theme.colors.contentPrimary }) }
            }}
          />
        )
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // overrides - "concern" destructured
        export default () => (
          <Foo
            overrides={{
              Root: { style: ({$theme: {colors}}) => ({ color: colors.foreground }) }
            }}
          />
        )
      `,
      output: `
        // overrides - "concern" destructured
        export default () => (
          <Foo
            overrides={{
              Root: { style: ({$theme: {colors}}) => ({ color: colors.contentPrimary }) }
            }}
          />
        )
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // overrides - deprecated property destructured
        export default () => (
          <Foo
            overrides={{
              Root: {
                style: ({
                  $theme: {
                    colors: { foreground }
                  }
                }) => ({ color: foreground })
              }
            }}
          />
        )
      `,
      output: `
        // overrides - deprecated property destructured
        export default () => (
          <Foo
            overrides={{
              Root: {
                style: ({
                  $theme: {
                    colors: { contentPrimary }
                  }
                }) => ({ color: contentPrimary })
              }
            }}
          />
        )
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // overrides - deprecated property destructured and renamed
        export default () => (
          <Foo
            overrides={{
              Root: {
                style: ({
                  $theme: {
                    colors: { foreground: foo }
                  }
                }) => ({ color: foo })
              }
            }}
          />
        )
      `,
      output: `
        // overrides - deprecated property destructured and renamed
        export default () => (
          <Foo
            overrides={{
              Root: {
                style: ({
                  $theme: {
                    colors: { contentPrimary: foo }
                  }
                }) => ({ color: foo })
              }
            }}
          />
        )
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // useStyletron - basic
        function Foo({ children }) {
          const [css, theme] = useStyletron()
          return (
            <div className={css({ color: theme.colors.foreground })}>{children}</div>
          )
        }
      `,
      output: `
        // useStyletron - basic
        function Foo({ children }) {
          const [css, theme] = useStyletron()
          return (
            <div className={css({ color: theme.colors.contentPrimary })}>{children}</div>
          )
        }
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // useStyletron - alternate name for theme
        function Foo({ children }) {
          const [css, foo] = useStyletron()
          return (
            <div className={css({ color: foo.colors.foreground })}>{children}</div>
          )
        }
      `,
      output: `
        // useStyletron - alternate name for theme
        function Foo({ children }) {
          const [css, foo] = useStyletron()
          return (
            <div className={css({ color: foo.colors.contentPrimary })}>{children}</div>
          )
        }
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // useStyletron - destructure "concern"
        function Foo({ children }) {
          const [css, {colors}] = useStyletron()
          return (
            <div className={css({ color: colors.foreground })}>{children}</div>
          )
        }
      `,
      output: `
        // useStyletron - destructure "concern"
        function Foo({ children }) {
          const [css, {colors}] = useStyletron()
          return (
            <div className={css({ color: colors.contentPrimary })}>{children}</div>
          )
        }
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // useStyletron - destructure "concern" and rename
        function Foo({ children }) {
          const [css, {colors: foo}] = useStyletron()
          return (
            <div className={css({ color: foo.foreground })}>{children}</div>
          )
        }
      `,
      output: `
        // useStyletron - destructure "concern" and rename
        function Foo({ children }) {
          const [css, {colors: foo}] = useStyletron()
          return (
            <div className={css({ color: foo.contentPrimary })}>{children}</div>
          )
        }
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // useStyletron - destructure deprecated property
        function Foo({ children }) {
          const [css, {colors: {foreground}}] = useStyletron()
          return (
            <div className={css({ color: foreground })}>{children}</div>
          )
        }
      `,
      output: `
        // useStyletron - destructure deprecated property
        function Foo({ children }) {
          const [css, {colors: {contentPrimary}}] = useStyletron()
          return (
            <div className={css({ color: contentPrimary })}>{children}</div>
          )
        }
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // useStyletron - destructure deprecated property with renaming
        function Foo({ children }) {
          const [css, {colors: {foreground: foo}}] = useStyletron()
          return (
            <div className={css({ color: foo })}>{children}</div>
          )
        }
      `,
      output: `
        // useStyletron - destructure deprecated property with renaming
        function Foo({ children }) {
          const [css, {colors: {contentPrimary: foo}}] = useStyletron()
          return (
            <div className={css({ color: foo })}>{children}</div>
          )
        }
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // createTheme - setting a deprecated property
        import {createTheme} from "baseui";
        const theme = createTheme({}, { foreground: "#000" });
      `,
      output: `
        // createTheme - setting a deprecated property
        import {createTheme} from "baseui";
        const theme = createTheme({}, { contentPrimary: "#000" });
      `,
      errors: [
        {
          messageId: MESSAGES.replaceThemeProperty.id,
          data: {
            old: 'foreground',
            new: 'contentPrimary',
          },
        },
      ],
    },
    {
      code: `
        // styled - property that does not have a replacement
        styled('div', (props) => ({
          color: props.$theme.colors.datepickerBackground,
        }));
      `,
      output: null,
      errors: [
        {
          messageId: MESSAGES.deprecateThemeProperty.id,
          data: {
            old: 'datepickerBackground',
          },
        },
      ],
    },
  ],
};

// For easier local testing
if (!process.env.CI) {
  let only = [];
  let skipped = [];
  [...tests.valid, ...tests.invalid].forEach((t) => {
    if (t.skip) {
      delete t.skip;
      skipped.push(t);
    }
    if (t.only) {
      delete t.only;
      only.push(t);
    }
  });
  const predicate = (t) => {
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
