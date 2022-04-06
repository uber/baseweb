//@ts-ignore
import { getAstPropValue, getCode } from 'react-view/dist/lib/code-generator';
import { PropTypes } from 'react-view';
import generate from '@babel/generator';
import { customProps } from '../custom-props';
import { generate as generateThemeWrapper, getProvider } from '../provider';

import * as t from '@babel/types';

test('overrides', () => {
  expect(
    getAstPropValue(
      {
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
        type: PropTypes.Custom,
        description: '',
      } as any,
      'overrides',
      customProps
    )
  ).toEqual({
    properties: [
      {
        computed: false,
        decorators: null,
        key: {
          name: 'Root',
          type: 'Identifier',
        },
        shorthand: false,
        type: 'ObjectProperty',
        value: {
          properties: [
            {
              computed: false,
              decorators: null,
              key: {
                name: 'style',
                type: 'Identifier',
              },
              shorthand: false,
              type: 'ObjectProperty',
              value: {
                async: false,
                body: {
                  body: [
                    {
                      body: {
                        expression: {
                          extra: {
                            raw: "'black'",
                            rawValue: 'black',
                          },
                          innerComments: undefined,
                          leadingComments: undefined,
                          loc: undefined,
                          trailingComments: undefined,
                          type: 'StringLiteral',
                          value: 'black',
                        },
                        extra: {},
                        innerComments: undefined,
                        leadingComments: undefined,
                        loc: undefined,
                        trailingComments: undefined,
                        type: 'ExpressionStatement',
                      },
                      extra: {},
                      innerComments: undefined,
                      label: {
                        extra: {},
                        innerComments: undefined,
                        leadingComments: undefined,
                        loc: undefined,
                        name: 'color',
                        trailingComments: undefined,
                        type: 'Identifier',
                      },
                      leadingComments: undefined,
                      loc: undefined,
                      trailingComments: undefined,
                      type: 'LabeledStatement',
                    },
                  ],
                  directives: [],
                  extra: {},
                  innerComments: undefined,
                  leadingComments: undefined,
                  loc: undefined,
                  trailingComments: undefined,
                  type: 'BlockStatement',
                },
                extra: {
                  parenStart: 0,
                  parenthesized: true,
                },
                generator: false,
                innerComments: undefined,
                leadingComments: undefined,
                loc: undefined,
                params: [],
                trailingComments: undefined,
                type: 'ArrowFunctionExpression',
              },
            },
          ],
          type: 'ObjectExpression',
        },
      },
    ],
    type: 'ObjectExpression',
  });
});

describe('get theme AST primitives', () => {
  test('getAstThemeWrapper', () => {
    expect(
      generate(
        generateThemeWrapper({ inputFill: 'yellow' }, t.jsxText('Hey') as any, 'light-theme') as any
      ).code
    ).toBe(`<ThemeProvider theme={createTheme(light-theme, {
  colors: {
    inputFill: "yellow"
  }
})}>Hey</ThemeProvider>`);
  });
});

describe('getCode', () => {
  test('stateful, hooks enabled component', () => {
    expect(
      getCode({
        props: {
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
            propHook: { what: 'e.target.value', into: 'value' },
          },
          overrides: {
            value: {
              Root: {
                active: true,
                style: `() => ({ color: 'black'})`,
              },
            },
            type: PropTypes.Custom,
            description: '',
          } as any,
        },
        componentName: 'Input',
        providerValue: { inputFill: 'yellow' },
        provider: getProvider({ inputFill: 'pink' }, 'lightThemePrimitives'),
        importsConfig: {
          'baseui/input': {
            named: ['Input'],
          },
        },
        customProps,
      })
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
          Root: { style: () => ({ color: "black" }) }
        }}
      />
    </ThemeProvider>
  );
}`);
  });
});
