import {
  getAstPropValue,
  getAstReactHooks,
  getAstImport,
  getEnumsToImport,
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
      expression: {type: 'BooleanLiteral', value: true},
      type: 'JSXExpressionContainer',
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
      expression: {
        extra: {
          raw: '42',
          rawValue: 42,
        },
        loc: undefined,
        type: 'NumericLiteral',
        value: 42,
      },
      type: 'JSXExpressionContainer',
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
      expression: {
        name: 'SIZE.large',
        type: 'Identifier',
      },
      type: 'JSXExpressionContainer',
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
      expression: {
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
      },
      type: 'JSXExpressionContainer',
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
      expression: {
        extra: {
          parenStart: 23,
          parenthesized: true,
        },
        loc: undefined,
        properties: [
          {
            computed: false,
            key: {
              loc: undefined,
              name: 'foo',
              type: 'Identifier',
            },
            loc: undefined,
            shorthand: false,
            type: 'ObjectProperty',
            value: {
              loc: undefined,
              type: 'BooleanLiteral',
              value: true,
            },
          },
        ],
        type: 'ObjectExpression',
      },
      type: 'JSXExpressionContainer',
    });
  });
  test('React node', () => {
    expect(
      getAstPropValue({
        value: '<div />',
        type: PropTypes.ReactNode,
        description: '',
      }),
    ).toEqual({
      expression: {
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
      type: 'JSXExpressionContainer',
    });
  });
  test('function', () => {
    expect(
      getAstPropValue({
        value: '(foo) => {}',
        type: PropTypes.Function,
        description: '',
      }),
    ).toEqual({
      expression: {
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
      },
      type: 'JSXExpressionContainer',
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
      type: 'JSXExpressionContainer',
      expression: {
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
                    type: 'ArrowFunctionExpression',
                    params: [],
                    generator: false,
                    async: false,
                    body: {
                      type: 'BlockStatement',
                      directives: [],
                      body: [
                        {
                          type: 'LabeledStatement',
                          label: {type: 'Identifier', name: 'color'},
                          body: {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'StringLiteral',
                              value: 'black',
                              extra: {rawValue: 'black', raw: "'black'"},
                            },
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
      },
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
              meta: {
                stateful: true,
              },
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

describe('getEnumsToImport', () => {
  test('get enums', () => {
    expect(
      getEnumsToImport({
        size: {
          value: 'large',
          options: {large: 'large'},
          type: PropTypes.Enum,
          description: '',
        },
      }),
    ).toEqual(['SIZE']);
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
            meta: {stateful: true},
          },
          onChange: {
            value: 'e => setValue(e.target.value)',
            type: PropTypes.Function,
            description: '',
            meta: {propHook: {what: 'e.target.value', into: 'value'}},
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
            meta: {
              names: ['Root'],
            },
          },
        },
        'Input',
        {themeValues: {inputFill: 'yellow'}, themeName: 'light'},
      ),
    ).toBe(`import { Input } from "baseui/input";
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
