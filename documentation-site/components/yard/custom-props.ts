/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as t from '@babel/types';
import template from '@babel/template';
import generate from '@babel/generator';
import { formatCode, parse } from 'react-view';

export type TCustomPropFields = {
  names: string[];
  sharedProps: { [key: string]: string | { type: string; description: string } };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOverridesInner = (overrides: any, acc: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overrides.forEach((override: any) => {
    const overrideName = override.key.name;
    const overrideProps = override.value.properties;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overrideProps.forEach((prop: any) => {
      if (prop.key.name === 'style') {
        acc[overrideName] = {
          style: formatCode(generate(prop.value).code),
          active: true,
        };
      }
      // looking for 'props' key
      if (prop.key.name === 'props') {
        // looking for 'overrides' key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prop.value.properties.forEach((subprop: any) => {
          if (subprop.key.name === 'overrides') {
            acc[overrideName] = {
              nestedValue: {},
              active: true,
            };
            parseOverridesInner(subprop.value.properties, acc[overrideName].nestedValue);
          }
        });
      }
    });
  });
};

export const parseOverrides = (code: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ast: any = parse(`const foo = ${code};`);
  const topOverrides = ast.program.body[0].declarations[0].init.properties;
  const returnValue = {};
  parseOverridesInner(topOverrides, returnValue);
  return returnValue;
};

type TGenerateValue = {
  [key: string]: {
    active: boolean;
    style?: string;
    nestedValue?: TGenerateValue;
  };
};

const generateOverrides = (value: TGenerateValue) => {
  const activeValues = Object.entries(value).filter(
    ([, val]) => val.active && (val.style || val.nestedValue)
  );
  if (activeValues.length === 0) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keys: any = activeValues.map(([key, val]) => {
    if (val.nestedValue) {
      const nestedOverride = generateOverrides(val.nestedValue);
      if (!nestedOverride) {
        return null;
      }
      return t.objectProperty(
        t.identifier(key),
        t.objectExpression([
          t.objectProperty(
            t.identifier('props'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            t.objectExpression([t.objectProperty(t.identifier('overrides'), nestedOverride as any)])
          ),
        ])
      );
    }
    return t.objectProperty(
      t.identifier(key),
      t.objectExpression([
        t.objectProperty(
          t.identifier('style'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          template.expression(val.style as string)({}) as any
        ),
      ])
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keysWithoutNulls = keys.filter((val: any) => !!val);
  if (keysWithoutNulls.length) {
    return t.objectExpression(keysWithoutNulls);
  }
  return null;
};

export const customProps = {
  overrides: {
    generate: generateOverrides,
    parse: parseOverrides,
  },
};
