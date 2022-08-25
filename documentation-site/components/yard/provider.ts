/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as t from '@babel/types';
import traverse from '@babel/traverse';
import type { Theme } from 'baseui';

import type { TProvider } from 'react-view';
import { getAstJsxElement } from 'react-view';

export const getThemeFromContext = (theme: Theme, themeConfig: string[]) => {
  const componentThemeObj: { [key: string]: string } = {};
  themeConfig.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentThemeObj[key] = (theme.colors as any)[key];
  });
  return componentThemeObj;
};

export const getActiveTheme = (
  values: { [key: string]: string },
  initialValues: { [key: string]: string }
) => {
  const activeValues: { [key: string]: string } = {};
  Object.keys(initialValues).forEach((key) => {
    activeValues[key] = initialValues[key];
    if (values && values[key]) {
      activeValues[key] = values[key];
    }
  });
  return activeValues;
};

export const getThemeDiff = (
  values: { [key: string]: string },
  initialValues: { [key: string]: string }
) => {
  const diff: { [key: string]: string } = {};
  Object.keys(values).forEach((key) => {
    if (initialValues[key] && values[key] && initialValues[key] !== values[key]) {
      diff[key] = values[key];
    }
  });
  return diff;
};

export type TProviderValue = { [key: string]: string } | undefined;

export const getProvider = (
  initialThemeValues: { [key: string]: string },
  themePrimitives: string
): TProvider => {
  return {
    value: undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parse: (astRoot: any): TProviderValue => {
      const newThemeValues: { [key: string]: string } = {};
      traverse(astRoot, {
        CallExpression(path) {
          if (
            //@ts-ignore
            path.node.callee.name === 'createTheme' &&
            path.node.arguments.length === 2 &&
            //@ts-ignore
            path.node.arguments[1].properties.length === 1
          ) {
            //@ts-ignore
            const colors = path.node.arguments[1].properties[0].value;
            colors.properties.forEach((prop: t.ObjectProperty) => {
              if (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                initialThemeValues[(prop.key as any).name] !== (prop.value as t.StringLiteral).value
              ) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newThemeValues[(prop.key as any).name] = (prop.value as t.StringLiteral).value;
              }
            });
          }
        },
      });
      return Object.keys(newThemeValues).length > 0 ? newThemeValues : undefined;
    },
    //@ts-ignore
    generate: (value: TProviderValue, childTree: t.JSXElement) =>
      generate(value, childTree, themePrimitives),
    imports: {
      baseui: {
        named: ['ThemeProvider', 'createTheme', themePrimitives],
      },
    },
  };
};

export const generate = (
  values: { [key: string]: string } | undefined,
  childTree: t.JSXElement,
  themePrimitives: string
) => {
  if (!values || Object.keys(values).length === 0) {
    return childTree;
  }
  return getAstJsxElement(
    'ThemeProvider',
    [
      t.jsxAttribute(
        t.jsxIdentifier('theme'),
        t.jsxExpressionContainer(
          t.callExpression(t.identifier('createTheme'), [
            t.identifier(themePrimitives),
            t.objectExpression([
              t.objectProperty(
                t.identifier('colors'),
                t.objectExpression(
                  Object.entries(values).map(([name, value]) =>
                    t.objectProperty(t.identifier(name), t.stringLiteral(value as string))
                  )
                )
              ),
            ]),
          ])
        )
      ),
    ],
    [childTree]
  );
};
