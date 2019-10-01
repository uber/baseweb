import traverse from '@babel/traverse';
import generate from '@babel/generator';
import {formatCode} from './code-generator';
import * as t from 'babel-types';
import {TProp} from './types';
import {PropTypes} from './const';
import {parse as babelParse} from '@babel/parser';
import {getAstJsxElement, formatAstAndPrint} from './code-generator';

export const parse = (code: string) =>
  babelParse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

// clean-up for react-live, removing all imports, exports and top level
// variable declaration, add __yard_onChange instrumentation when needed
export const transformBeforeCompilation = (
  ast: any,
  elementName: string,
  propsConfig: {[key: string]: TProp},
) => {
  try {
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
      // adds internal state instrumentation through __yard_onChange callback
      JSXElement(path) {
        if (
          path.node.openingElement.type === 'JSXOpeningElement' &&
          //@ts-ignore
          path.node.openingElement.name.name === elementName
        ) {
          path
            .get('openingElement')
            .get('attributes')
            .forEach(attr => {
              const name = (attr.get('name') as any).node.name;
              if (propsConfig[name].type === PropTypes.Function) {
                const propHook = propsConfig[name].propHook;
                if (propHook) {
                  const yardOnChageCallExpression = t.callExpression(
                    t.identifier('__yard_onChange'),
                    [
                      t.stringLiteral(elementName),
                      t.stringLiteral(propHook.into),
                      t.identifier(propHook.what),
                    ],
                  );
                  const callbackBody = (attr.get('value') as any)
                    .get('expression')
                    .get('body');

                  if (callbackBody.type === 'BlockStatement') {
                    // when the callback body is a block
                    // e.g.: e => { setValue(e.target.value) }
                    callbackBody.pushContainer(
                      'body',
                      yardOnChageCallExpression,
                    );
                  } else {
                    // when it is a single statement like e => setValue(e.target.value)
                    // we have to create a BlockStatement first
                    callbackBody.replaceWith(
                      t.blockStatement([
                        t.expressionStatement(callbackBody.node),
                        t.expressionStatement(yardOnChageCallExpression),
                      ]),
                    );
                  }
                }
              }
            });
        }
      },
    });
  } catch (e) {}
  return ast;
};

export function parseOverrides(code: string, names: string[]) {
  const resultOverrides: any = {};
  try {
    // to make the AST root valid, let's add a const definition
    const ast: any = parse(`const foo = ${code};`);
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
    const ast = parse(code) as any;
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
  const stateValues: any = {};
  let themeValues: any = {};
  try {
    const ast = parse(code) as any;
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
                  value = formatAstAndPrint(
                    //@ts-ignore
                    t.program([t.expressionStatement(attr.value.expression)]),
                    name === 'overrides' ? 70 : 30,
                  );
                }
              }
            }
            propValues[name] = value;
          });
          propValues['children'] = formatAstAndPrint(
            getAstJsxElement('YardRoot', [], path.node.children as any) as any,
            30,
          )
            .replace(/\n  /g, '\n')
            .replace(/^<YardRoot>\n?/, '')
            .replace(/<\/YardRoot>$/, '')
            .replace(/\s*<YardRoot \/>\s*/, '');
        }
      },
      VariableDeclarator(path) {
        // looking for React.useState()
        const node = path.node as any;
        if (
          node.id.type === 'ArrayPattern' &&
          node.init.type === 'CallExpression' &&
          node.init.callee.property.name === 'useState'
        ) {
          const name = node.id.elements[0].name;
          const valueNode = node.init.arguments[0];
          if (
            valueNode.type === 'StringLiteral' ||
            valueNode.type === 'BooleanLiteral'
          ) {
            stateValues[name] = valueNode.value;
          } else {
            stateValues[name] = generate(valueNode).code;
          }
        }
      },
    });
  } catch (e) {
    throw new Error("Code is not valid and can't be parsed.");
  }

  // override props by local state (React hooks)
  Object.keys(stateValues).forEach(stateValueKey => {
    Object.keys(propValues).forEach(propValueKey => {
      if (propValues[propValueKey] === stateValueKey) {
        propValues[propValueKey] = stateValues[stateValueKey];
      }
    });
  });

  return {parsedProps: propValues, parsedTheme: themeValues};
}
