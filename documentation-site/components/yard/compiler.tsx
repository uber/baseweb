import React from 'react';
import {transformFromAstSync} from '@babel/core';
import {parse} from '@babel/parser';
import {useStyletron} from 'baseui';
//import generate from "@babel/generator";
//@ts-ignore
import presetReact from '@babel/preset-react';

const errorBoundary = (
  Element: React.FC | React.ComponentClass | undefined,
  errorCallback: (error: Error) => void,
) => {
  class ErrorBoundary extends React.Component {
    componentDidCatch(error: Error) {
      errorCallback(error);
    }
    render() {
      if (typeof Element === 'undefined') return null;
      return typeof Element === 'function' ? <Element /> : Element;
    }
  }
  return ErrorBoundary;
};

export const codeToAst = (code: string) =>
  parse(code, {sourceType: 'module', plugins: ['jsx']});

const evalCode = (ast: babel.types.Node, scope: any) => {
  const transformedCode = transformFromAstSync(
    ast as babel.types.Node,
    undefined,
    {
      presets: [presetReact],
    },
  );
  const resultCode = transformedCode ? transformedCode.code : '';
  const scopeKeys = Object.keys(scope);
  const scopeValues = Object.values(scope);
  const res = new Function('React', ...scopeKeys, `return ${resultCode}`);
  return res(React, ...scopeValues);
};

const generateElement = (
  ast: babel.types.Node,
  scope: any,
  errorCallback: (error: Error) => void,
) => {
  return errorBoundary(evalCode(ast, scope), errorCallback);
};

const transpile = (
  code: string,
  transformations: ((ast: babel.types.Node) => babel.types.Node)[],
  scope: any,
  setOutput: (params: {component: React.ComponentClass | null}) => void,
  setError: (error: string | null) => void,
) => {
  try {
    const ast = transformations.reduce(
      (result, transformation) => transformation(result),
      codeToAst(code) as babel.types.Node,
    );
    const component = generateElement(ast, scope, (error: Error) => {
      setError(error.toString());
      setOutput({component: null});
    });
    setOutput({component});
    setError(null);
  } catch (error) {
    setError(error.toString());
  }
};

const Compiler: React.FC<{
  scope: any;
  code: string;
  setError: (error: string | null) => void;
  transformations: ((ast: babel.types.Node) => babel.types.Node)[];
}> = ({scope, code, setError, transformations}) => {
  const [output, setOutput] = React.useState<{
    component: React.ComponentClass | null;
  }>({component: null});
  const [css, theme] = useStyletron();

  React.useEffect(() => {
    transpile(code, transformations, scope, setOutput, setError);
  }, [code]);

  const Element = output.component;
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        padding: theme.sizing.scale600,
      })}
    >
      {Element && <Element />}
    </div>
  );
};

export default Compiler;
