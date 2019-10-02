import {
  getAstPropValue,
  getAstReactHooks,
  getAstImport,
  getAstImports,
  getAstThemeImport,
  getAstThemeWrapper,
  getCode,
} from '../code-generator';
import {PropTypes} from '../const';
import generate from '@babel/generator';
import * as t from '@babel/types';

describe('getAstPropValue', () => {
  test('boolean', () => {
    expect(
      getAstPropValue({
        value: true,
        type: PropTypes.Boolean,
        description: '',
      }),
    ).toEqual({
      type: 'BooleanLiteral',
      value: true,
    });
  });
  test('string', () => {
    expect(
      getAstPropValue({
        value: 'Hello',
        type: PropTypes.String,
        description: '',
      }),
    ).toEqual({
      type: 'StringLiteral',
      value: 'Hello',
    });
  });
  test('number', () => {
    expect(
      getAstPropValue({
        value: '42',
        type: PropTypes.Number,
        description: '',
      }),
    ).toEqual({
      extra: {
        raw: '42',
        rawValue: 42,
      },
      loc: undefined,
      type: 'NumericLiteral',
      value: 42,
    });
  });
  test('enum', () => {
    expect(
      getAstPropValue({
        value: 'SIZE.large',
        type: PropTypes.Enum,
        description: '',
      }),
    ).toEqual({
      name: 'SIZE.large',
      type: 'Identifier',
    });
  });
  test('ref', () => {
    expect(
      getAstPropValue({
        value: undefined,
        type: PropTypes.Ref,
        description: '',
      }),
    ).toBe(null);
  });
  test('array', () => {
    expect(
      getAstPropValue({
        value: '[1]',
        type: PropTypes.Array,
        description: '',
      }),
    ).toEqual({
      elements: [
        {
          extra: {
            raw: '1',
            rawValue: 1,
          },
          loc: undefined,
          type: 'NumericLiteral',
          value: 1,
        },
      ],
      loc: undefined,
      type: 'ArrayExpression',
    });
  });
  test('object', () => {
    expect(
      getAstPropValue({
        value: `{foo: true}`,
        type: PropTypes.Object,
        description: '',
      }),
    ).toEqual({
      body: [
        {
          body: {
            expression: {
              loc: undefined,
              type: 'BooleanLiteral',
              value: true,
            },
            loc: undefined,
            type: 'ExpressionStatement',
          },
          label: {
            loc: undefined,
            name: 'foo',
            type: 'Identifier',
          },
          loc: undefined,
          type: 'LabeledStatement',
        },
      ],
      directives: [],
      loc: undefined,
      type: 'BlockStatement',
    });
  });
  test('React node', () => {
    expect(
      getAstPropValue({
        value: '<div />',
        type: PropTypes.ReactNode,
        description: '',
      }),
    ).toEqual([
      {
        children: [],
        closingElement: null,
        loc: undefined,
        openingElement: {
          attributes: [],
          loc: undefined,
          name: {
            loc: undefined,
            name: 'div',
            type: 'JSXIdentifier',
          },
          selfClosing: true,
          type: 'JSXOpeningElement',
        },
        type: 'JSXElement',
      },
    ]);
  });
  test('function', () => {
    expect(
      getAstPropValue({
        value: '(foo) => {}',
        type: PropTypes.Function,
        description: '',
      }),
    ).toEqual({
      async: false,
      body: {
        body: [],
        directives: [],
        loc: undefined,
        type: 'BlockStatement',
      },
      generator: false,
      loc: undefined,
      params: [
        {
          loc: undefined,
          name: 'foo',
          type: 'Identifier',
        },
      ],
      type: 'ArrowFunctionExpression',
    });
  });
  test('overrides', () => {
    expect(
      getAstPropValue({
        value: {
          Root: {
            active: true,
            style: `() => { color: 'black'}`,
          },
          NotActiveNotInAST: {
            active: false,
            style: `() => { color: 'pink'}`,
          },
        },
        type: PropTypes.Overrides,
        description: '',
      }),
    ).toEqual({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          key: {type: 'Identifier', name: 'Root'},
          value: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'ObjectProperty',
                key: {type: 'Identifier', name: 'style'},
                value: {
                  loc: undefined,
                  type: 'ArrowFunctionExpression',
                  params: [],
                  generator: false,
                  async: false,
                  body: {
                    loc: undefined,
                    type: 'BlockStatement',
                    directives: [],
                    body: [
                      {
                        type: 'LabeledStatement',
                        label: {type: 'Identifier', name: 'color'},
                        loc: undefined,
                        body: {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'StringLiteral',
                            value: 'black',
                            extra: {rawValue: 'black', raw: "'black'"},
                            loc: undefined,
                          },
                          loc: undefined,
                        },
                      },
                    ],
                  },
                  extra: {parenthesized: true, parenStart: 0},
                },
                computed: false,
                shorthand: false,
                decorators: null,
              },
            ],
          },
          computed: false,
          shorthand: false,
          decorators: null,
        },
      ],
    });
  });
});

describe('getAstReactHooks', () => {
  test('return single value hook', () => {
    expect(
      generate(
        t.program(
          //@ts-ignore
          getAstReactHooks({
            value: {
              value: 'Hey',
              type: PropTypes.String,
              description: '',
              stateful: true,
            },
            foo: {
              value: 'Not stateful',
              type: PropTypes.String,
              description: '',
            },
          }),
        ),
      ).code,
    ).toBe('const [value, setValue] = React.useState("Hey");');
  });
});

describe('getAstImport', () => {
  test('return multiple named imports', () => {
    expect(
      generate(getAstImport(['Button', 'KIND'], 'baseui/button') as any).code,
    ).toBe('import { Button, KIND } from "baseui/button";');
  });
});

describe('getAstImports', () => {
  test('return multiple named and default imports', () => {
    expect(
      generate(t.program(
        getAstImports(
          {
            'baseui/tabs': {
              named: ['Tab'],
              default: 'Root',
            },
            'react-motion': {
              named: ['Motion'],
            },
          },
          {
            a: {
              value: true,
              type: PropTypes.Boolean,
              description: '',
              imports: {
                'baseui/tabs': {
                  named: ['Tab', 'Tabs'],
                  default: 'OverrideRoot',
                },
              },
            },
            b: {
              value: undefined,
              type: PropTypes.String,
              description: '',
              imports: {
                'baseui/button': {
                  named: ['Button'],
                },
              },
            },
          },
        ),
      ) as any).code,
    ).toBe(`import OverrideRoot, { Tab, Tabs } from "baseui/tabs";
import { Motion } from "react-motion";`);
  });
});

describe('get theme AST primitives', () => {
  test('getAstThemeImport', () => {
    expect(
      generate(
        //@ts-ignore
        t.program(getAstThemeImport(true, 'dark') as any),
      ).code,
    ).toBe('import { ThemeProvider, createTheme, dark } from "baseui";');
  });

  test('getAstThemeWrapper', () => {
    expect(
      generate(getAstThemeWrapper(
        {inputFill: 'yellow'},
        'light-theme',
        //@ts-ignore
        t.jsxText('Hey'),
      ) as any).code,
    ).toBe(`<ThemeProvider theme={createTheme(light-theme, {
  colors: {
    inputFill: "yellow"
  }
})}>Hey</ThemeProvider>`);
  });
});

describe('getCode', () => {
  test('stateful, hooks, overrides and theme enabled component', () => {
    expect(
      getCode(
        {
          value: {
            value: 'Hello',
            type: PropTypes.String,
            description: 'Input value attribute.',
            stateful: true,
          },
          onChange: {
            value: 'e => setValue(e.target.value)',
            type: PropTypes.Function,
            description: '',
            propHook: {what: 'e.target.value', into: 'value'},
          },
          overrides: {
            value: {
              Root: {
                style:
                  '({ $theme }) => {\n  return {\n    outline: `${$theme.colors.warning200} solid`,\n    backgroundColor: $theme.colors.warning200\n  };\n}',
                active: true,
              },
            },
            type: PropTypes.Overrides,
            description: '',
            names: ['Root'],
          },
        },
        'Input',
        {themeValues: {inputFill: 'yellow'}, themeName: 'light'},
        {
          'baseui/input': {
            named: ['Input'],
          },
        },
      ),
    ).toBe(`import * as React from "react";
import { Input } from "baseui/input";
import {
  ThemeProvider,
  createTheme,
  lightThemePrimitives
} from "baseui";

export default () => {
  const [value, setValue] = React.useState("Hello");
  return (
    <ThemeProvider
      theme={createTheme(lightThemePrimitives, {
        colors: { inputFill: "yellow" }
      })}
    >
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        overrides={{
          Root: {
            style: ({ $theme }) => {
              return {
                outline: \`\${$theme.colors.warning200} solid\`,
                backgroundColor: $theme.colors.warning200
              };
            }
          }
        }}
      />
    </ThemeProvider>
  );
}`);
  });
});
