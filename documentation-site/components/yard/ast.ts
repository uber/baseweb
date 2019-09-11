import prettier from 'prettier/standalone';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from 'babel-types';
import babel from 'prettier/parser-babylon';

const parse = babel.parsers.babel.parse as (code: string) => any;

// clean-up for react-live, removing all imports, exports and top level
// variable declaration
export const removeImportsAndExports = (code: string) => {
  let result = code;
  try {
    const ast = parse(code);
    traverse(ast, {
      VariableDeclaration(path) {
        if (path.parent.type === 'Program') {
          //@ts-ignore
          path.replaceWith(path.node.declarations[0].init);
        }
      },
      ImportDeclaration(path) {
        path.remove();
      },
      ExportDefaultDeclaration(path) {
        if (
          path.node.declaration.type === 'ArrowFunctionExpression' ||
          path.node.declaration.type === 'FunctionDeclaration'
        ) {
          path.replaceWith(path.node.declaration);
        } else {
          path.remove();
        }
      },
    });
    result = generate(ast).code;
  } catch (e) {}
  return result;
};

export const formatCode = (code: string) => {
  try {
    return (
      prettier
        .format(code, {
          parser: 'babel',
          printWidth: 70,
          plugins: [babel],
        })
        // remove newline at the end of file
        .replace(/[\r\n]+$/, '')
        // remove ; at the end of file
        .replace(/[;]+$/, '')
    );
  } catch (e) {
    return code;
  }
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

export function toggleOverrideSharedProps(code: string, sharedProps: string[]) {
  let result: string = '';
  try {
    const ast = parse(code);
    traverse(ast, {
      ArrowFunctionExpression(path) {
        if (result !== '') return;
        if (path.node.params.length !== 1) return;
        const firstParam: any = path.node.params[0];
        let newParams: string[] = [];
        if (firstParam.type === 'ObjectPattern') {
          const properties = firstParam.properties;
          newParams = properties.map((prop: any) => prop.key.name);
        }

        const shoudlWeAddSharedProps = newParams.every(
          name => !sharedProps.includes(name),
        );

        if (shoudlWeAddSharedProps) {
          sharedProps.forEach(param => {
            if (!newParams.includes(param)) {
              newParams.push(param);
            }
          });
          path.node.params = [
            t.objectPattern(
              //@ts-ignore
              newParams.map(param =>
                t.objectProperty(
                  t.identifier(param),
                  t.identifier(param),
                  false,
                  true,
                ),
              ),
            ),
          ];
        } else {
          path.node.params = [
            //@ts-ignore
            t.objectPattern([
              t.objectProperty(
                t.identifier('$theme'),
                t.identifier('$theme'),
                false,
                true,
              ),
            ]),
          ];
        }
        result = generate(path.node as any).code;
      },
    });
  } catch (e) {
    throw new Error('Override params transform was no good.');
  }
  return result;
}

export function parseCode(code: string, elementName: string) {
  const propValues: any = {};
  let themeValues: any = {};
  try {
    const ast = parse(code);
    traverse(ast, {
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
          colors.properties.forEach(
            (prop: any) => (themeValues[prop.key.name] = prop.value.value),
          );
        }
      },
      JSXElement(path) {
        if (
          Object.keys(propValues).length === 0 && // process just the first element
          path.node.openingElement.type === 'JSXOpeningElement' &&
          //@ts-ignore
          path.node.openingElement.name.name === elementName
        ) {
          path.node.openingElement.attributes.forEach((attr: any) => {
            const name = attr.name.name;
            let value = null;
            if (attr.value === null) {
              //boolean prop without value
              value = true;
            } else {
              if (attr.value.type === 'StringLiteral') {
                value = attr.value.value;
              } else if (attr.value.type === 'JSXExpressionContainer') {
                if (attr.value.expression.type === 'BooleanLiteral') {
                  value = attr.value.expression.value;
                } else {
                  value = generate(attr.value.expression).code;
                }
              }
            }
            propValues[name] = value;
          });
          propValues['children'] = generate(
            (path.node as any).children,
          ).code.replace(/^\s+|\s+$/g, '');
        }
      },
    });
  } catch (e) {
    throw new Error("Code is not valid and can't be parsed.");
  }
  return {parsedProps: propValues, parsedTheme: themeValues};
}
