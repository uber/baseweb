/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      'overrides',
      customProps
    )
  ).toMatchInlineSnapshot(`
    Object {
      "properties": Array [
        Object {
          "computed": false,
          "decorators": null,
          "key": Object {
            "name": "Root",
            "type": "Identifier",
          },
          "shorthand": false,
          "type": "ObjectProperty",
          "value": Object {
            "properties": Array [
              Object {
                "computed": false,
                "decorators": null,
                "key": Object {
                  "name": "style",
                  "type": "Identifier",
                },
                "shorthand": false,
                "type": "ObjectProperty",
                "value": Object {
                  "async": false,
                  "body": Object {
                    "body": Array [
                      Object {
                        "body": Object {
                          "expression": Object {
                            "extra": Object {
                              "raw": "'black'",
                              "rawValue": "black",
                            },
                            "loc": undefined,
                            "type": "StringLiteral",
                            "value": "black",
                          },
                          "loc": undefined,
                          "type": "ExpressionStatement",
                        },
                        "label": Object {
                          "loc": undefined,
                          "name": "color",
                          "type": "Identifier",
                        },
                        "loc": undefined,
                        "type": "LabeledStatement",
                      },
                    ],
                    "directives": Array [],
                    "loc": undefined,
                    "type": "BlockStatement",
                  },
                  "extra": Object {
                    "parenStart": 0,
                    "parenthesized": true,
                  },
                  "generator": false,
                  "loc": undefined,
                  "params": Array [],
                  "type": "ArrowFunctionExpression",
                },
              },
            ],
            "type": "ObjectExpression",
          },
        },
      ],
      "type": "ObjectExpression",
    }
  `);
});

describe('get theme AST primitives', () => {
  test('getAstThemeWrapper', () => {
    expect(
      generate(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
