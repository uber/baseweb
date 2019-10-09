import React from 'react';
import {transformFromAstSync} from '@babel/core';
import {parse} from './ast';
import {useStyletron} from 'baseui';
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
  //@ts-ignore
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
      parse(code) as babel.types.Node,
    );
    const component = generateElement(ast, scope, (error: Error) => {
      setError(error.toString());
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
  minHeight: number;
  setError: (error: string | null) => void;
  transformations: ((ast: babel.types.Node) => babel.types.Node)[];
  PlaceholderElement: React.FC;
}> = ({
  scope,
  code,
  setError,
  transformations,
  PlaceholderElement,
  minHeight,
}) => {
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
        minHeight: `${minHeight}px`,
        paddingTop: minHeight ? theme.sizing.scale600 : 0,
        paddingBottom: minHeight ? theme.sizing.scale600 : 0,
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        })}
      >
        {Element ? <Element /> : <PlaceholderElement />}
      </div>
    </div>
  );
};

export default React.memo(
  Compiler,
  (prevProps, nextProps) => prevProps.code === nextProps.code,
);
