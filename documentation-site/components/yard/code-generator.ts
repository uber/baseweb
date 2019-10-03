import clone from 'just-clone';
import {TProp, TImportsConfig} from './types';
import {PropTypes} from './const';
import {parse} from './ast';
import template from '@babel/template';
import * as t from '@babel/types';

// forked prettier on a diet
//@ts-ignore
import prettier from '@miksu/prettier/lib/standalone';
//@ts-ignore
import parsers from '@miksu/prettier/lib/language-js/parser-babylon';

type TJsxChild =
  | t.JSXText
  | t.JSXExpressionContainer
  | t.JSXSpreadChild
  | t.JSXElement
  | t.JSXFragment;

const reactImport = template.ast(`import * as React from 'react';`);

export const getAstPropsArray = (props: {[key: string]: TProp}) => {
  return Object.entries(props).map(([name, prop]) => {
    const {value, stateful} = prop;
    if (stateful)
      return t.jsxAttribute(
        t.jsxIdentifier(name),
        t.jsxExpressionContainer(t.identifier(name)),
      );
    if (!value) return null;
    const astValue = getAstPropValue(prop);
    if (!astValue) return null;
    return t.jsxAttribute(
      t.jsxIdentifier(name),
      prop.type === PropTypes.String
        ? astValue
        : t.jsxExpressionContainer(astValue),
    );
  });
};

export const getAstPropValue = (prop: TProp) => {
  const value = prop.value;
  switch (prop.type as PropTypes) {
    case PropTypes.String:
      return t.stringLiteral(String(value));
    case PropTypes.Boolean:
      return t.booleanLiteral(Boolean(value));
    case PropTypes.Enum:
      return t.identifier(String(value));
    case PropTypes.Ref:
      return null;
    case PropTypes.Object:
      return template.ast(`${value}`, {plugins: ['jsx']}) as any;
    case PropTypes.Array:
    case PropTypes.Number:
    case PropTypes.Function:
      return (template.ast(String(value), {plugins: ['jsx']}) as any)
        .expression;
    case PropTypes.ReactNode:
      return (template.ast(`<>${value}</>`, {plugins: ['jsx']}) as any)
        .expression.children;
    case PropTypes.Overrides:
      const activeValues = Object.entries(value as {
        [key: string]: {active: boolean; style: string};
      }).filter(([, val]: any) => val.active);
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
  }
};

export const getAstReactHooks = (props: {[key: string]: TProp}) => {
  const hooks: babel.types.ExpressionStatement[] = [];
  const buildReactHook = template(
    `const [%%name%%, %%setName%%] = React.useState(%%value%%);`,
  );
  Object.keys(props).forEach(name => {
    if (props[name].stateful === true) {
      hooks.push(buildReactHook({
        name: t.identifier(name),
        setName: t.identifier(`set${name[0].toUpperCase() + name.slice(1)}`),
        value: getAstPropValue(props[name]),
      }) as any);
    }
  });
  return hooks;
};

export const getAstImport = (
  identifiers: string[],
  source: string,
  defaultIdentifier?: string,
) => {
  return t.importDeclaration(
    [
      ...(defaultIdentifier
        ? [t.importDefaultSpecifier(t.identifier(defaultIdentifier))]
        : []),
      ...identifiers.map(identifier =>
        t.importSpecifier(t.identifier(identifier), t.identifier(identifier)),
      ),
    ],
    t.stringLiteral(source),
  );
};

export const getAstJsxElement = (
  name: string,
  attrs: (t.JSXAttribute | null)[],
  children: TJsxChild[],
) => {
  const isSelfClosing = children.length === 0;
  return t.jsxElement(
    t.jsxOpeningElement(
      t.jsxIdentifier(name),
      attrs.filter(attr => !!attr) as t.JSXAttribute[],
      isSelfClosing,
    ),
    isSelfClosing ? null : t.jsxClosingElement(t.jsxIdentifier(name)),
    children,
    true,
  );
};

export const getAstThemeImport = (
  isCustomTheme: boolean,
  themePrimitives: string,
) => {
  if (!isCustomTheme) return [];
  const buildImportTheme = template(
    `import {ThemeProvider, createTheme, %%primitives%%} from "baseui"`,
  );
  return [
    buildImportTheme({
      primitives: t.identifier(themePrimitives),
    }),
  ];
};

export const getAstThemeWrapper = (
  themeValues: {[key: string]: string},
  themePrimitives: string,
  children: t.JSXElement,
) => {
  if (!themeValues || Object.keys(themeValues).length === 0) {
    return children;
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
                  Object.entries(themeValues).map(([name, value]) =>
                    t.objectProperty(
                      t.identifier(name),
                      t.stringLiteral(value as string),
                    ),
                  ),
                ),
              ),
            ]),
          ]),
        ),
      ),
    ],
    [children],
  );
};

export const getAstImports = (
  importsConfig: TImportsConfig,
  props: {[key: string]: TProp},
) => {
  // global scoped import that are always displayed
  const importList = clone(importsConfig);

  // prop level imports (typically enums related) that are displayed
  // only when the prop is being used
  Object.values(props).forEach(prop => {
    if (prop.imports && prop.value && prop.value !== '') {
      for (let [importFrom, importNames] of Object.entries(prop.imports)) {
        if (!importList.hasOwnProperty(importFrom)) {
          importList[importFrom] = {
            named: [],
            default: '',
          };
        }
        if (importNames.default) {
          importList[importFrom].default = importNames.default;
        }
        if (importNames.named && importNames.named.length > 0) {
          if (!importList[importFrom].hasOwnProperty('named')) {
            importList[importFrom]['named'] = [];
          }
          importList[importFrom].named = [
            ...new Set(
              (importList[importFrom].named as string[]).concat(
                importNames.named,
              ),
            ),
          ];
        }
      }
    }
  });

  return Object.keys(importList).map(from =>
    getAstImport(importList[from].named || [], from, importList[from].default),
  );
};

export const getAst = (
  props: {[key: string]: TProp},
  componentName: string,
  theme: any,
  importsConfig: TImportsConfig,
) => {
  const {children, ...restProps} = props;
  const isCustomTheme =
    theme && theme.themeValues && Object.keys(theme.themeValues).length > 0;
  const themePrimitives =
    theme.themeName && theme.themeName.startsWith('dark-theme')
      ? 'darkThemePrimitives'
      : 'lightThemePrimitives';

  const buildExport = template(`export default () => {%%body%%}`);
  return t.file(
    t.program([
      reactImport,
      ...getAstImports(importsConfig, props),
      ...getAstThemeImport(isCustomTheme, themePrimitives),
      buildExport({
        body: [
          ...getAstReactHooks(restProps),
          t.returnStatement(
            getAstThemeWrapper(
              theme.themeValues,
              themePrimitives,
              getAstJsxElement(
                componentName,
                getAstPropsArray(restProps),
                children && children.value ? getAstPropValue(children) : [],
              ),
            ),
          ),
        ],
      }),
    ] as any),
    [],
    [],
  );
};

export const formatAstAndPrint = (ast: t.Program, printWidth?: number) => {
  const result = (prettier as any).__debug.formatAST(ast, {
    originalText: '',
    parser: 'babel',
    printWidth: printWidth ? printWidth : 58,
    plugins: [parsers],
  });
  return (
    result.formatted
      // add a new line before export
      .replace('export default', '\nexport default')
      // remove newline at the end of file
      .replace(/[\r\n]+$/, '')
      // remove ; at the end of file
      .replace(/[;]+$/, '')
  );
};

export const formatCode = (code: string): string => {
  return formatAstAndPrint(parse(code) as any);
};

export const getCode = (
  props: {[key: string]: TProp},
  componentName: string,
  theme: {themeValues: {[key: string]: string}; themeName: string},
  importsConfig: TImportsConfig,
) => {
  const ast = getAst(props, componentName, theme, importsConfig);
  return formatAstAndPrint(ast as any);
};
