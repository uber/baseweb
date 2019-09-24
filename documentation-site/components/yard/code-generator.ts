import {TProp} from './types';
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

export const getAstPropsArray = (props: {[key: string]: TProp}) => {
  return Object.entries(props).map(([name, prop]) => {
    const {value, meta} = prop;
    const isStateful: boolean = meta ? (meta as any).stateful === true : false;
    if (!value) return null;
    if (isStateful)
      return t.jsxAttribute(
        t.jsxIdentifier(name),
        t.jsxExpressionContainer(t.identifier(name)),
      );
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
      return t.stringLiteral(value);
    case PropTypes.Boolean:
      return t.booleanLiteral(value);
    case PropTypes.Enum:
      return t.identifier(value);
    case PropTypes.Ref:
      return null;
    case PropTypes.Object:
      return template.ast(`${value}`, {plugins: ['jsx']}) as any;
    case PropTypes.Array:
    case PropTypes.Number:
    case PropTypes.Function:
    case PropTypes.ReactNode:
      return (template.ast(value, {plugins: ['jsx']}) as any).expression;
    case PropTypes.Overrides:
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
  }
};

export const getAstReactHooks = (props: {[key: string]: TProp}) => {
  const hooks: babel.types.ExpressionStatement[] = [];
  const buildReactHook = template(
    `const [%%name%%, %%setName%%] = React.useState(%%value%%);`,
  );
  Object.keys(props).forEach(name => {
    if (props[name].meta && (props[name] as any).meta.stateful === true) {
      hooks.push(buildReactHook({
        name: t.identifier(name),
        setName: t.identifier(`set${name[0].toUpperCase() + name.slice(1)}`),
        value: getAstPropValue(props[name]),
      }) as any);
    }
  });
  return hooks;
};

export const getAstImport = (identifiers: string[], source: string) => {
  return t.importDeclaration(
    identifiers.map(identifier =>
      t.importSpecifier(t.identifier(identifier), t.identifier(identifier)),
    ),
    t.stringLiteral(source),
  );
};

export const getEnumsToImport = (props: {[key: string]: TProp}) => {
  const enums: string[] = [];
  Object.keys(props).forEach(name => {
    if (props[name].type === PropTypes.Enum && props[name].value) {
      enums.push(name.toUpperCase());
    }
  });
  return enums;
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

export const getAst = (
  props: {[key: string]: TProp},
  componentName: string,
  theme: any,
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
      getAstImport(
        [componentName, ...getEnumsToImport(restProps)],
        `baseui/${componentName
          .split(/(?=[A-Z])/)
          .join('-')
          .toLowerCase()}`,
      ),
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
                children && children.value ? [t.jsxText(children.value)] : [],
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

export const formatAstAndPrint = (ast: t.Program) => {
  const result = (prettier as any).__debug.formatAST(ast, {
    originalText: '',
    parser: 'babel',
    printWidth: 70,
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
) => {
  const ast = getAst(props, componentName, theme);
  return formatAstAndPrint(ast as any);
};
