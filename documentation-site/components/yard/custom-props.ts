import * as t from '@babel/types';
import template from '@babel/template';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import {formatCode, parse} from 'react-view';

export type TCustomPropFields = {
  names: string[];
  sharedProps: {[key: string]: string | {type: string; description: string}};
};

export function parseOverrides(code: string, names: string[]) {
  const resultOverrides: any = {};
  try {
    // to make the AST root valid, let's add a const definition
    const ast = parse(`const foo = ${code};`);
    traverse(ast, {
      ObjectProperty(path) {
        const propertyName = path.node.key.name;
        if (names.includes(propertyName)) {
          //@ts-ignore
          const overrideProps = path.node.value.properties;
          overrideProps.forEach((prop: any) => {
            if (prop.key.name === 'style') {
              resultOverrides[propertyName] = {
                style: formatCode(generate(prop.value).code),
                active: true,
              };
            }
          });
        }
      },
    });
  } catch (e) {
    throw new Error("Overrides code is not valid and can't be parsed.");
  }
  return resultOverrides;
}

export const customProps = {
  overrides: {
    generate: (value: {[key: string]: {active: boolean; style: string}}) => {
      const activeValues = Object.entries(value).filter(
        ([, val]: any) => val.active,
      );
      if (activeValues.length === 0) return null;
      const keys = activeValues.map(([key, val]: [string, any]) =>
        t.objectProperty(
          t.identifier(key),
          t.objectExpression([
            t.objectProperty(t.identifier('style'), template.expression(
              val.style,
            )({}) as any),
          ]),
        ),
      );
      return t.objectExpression(keys);
    },
    parse: (code: string, knobProps: any) => {
      const names =
        knobProps && knobProps.overrides ? knobProps.overrides.names || [] : [];
      return parseOverrides(code, names);
    },
  },
};
