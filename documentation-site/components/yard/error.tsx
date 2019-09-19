import * as React from 'react';
import {codeFrameColumns} from '@babel/code-frame';
import {useStyletron} from 'baseui';

const frameError = (error: string, code: string) => {
  if (error) {
    const found = error.match(/\((\d+)\:(\d+)\)$/);
    if (found) {
      const location = {
        start: {line: parseInt(found[1], 10), column: parseInt(found[2], 10)},
      };
      return `${error}\n\n${codeFrameColumns(code, location)}`;
    }
  }
  return error;
};

const Error: React.FC<{error: string | null; code: string}> = ({
  error,
  code,
}) => {
  const [css, theme] = useStyletron();
  const errorCx = css({
    backgroundColor: theme.colors.negative600,
    whiteSpace: 'pre',
    fontSize: '11px',
    fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
    color: theme.colors.mono100,
    padding: theme.sizing.scale600,
    marginTop: theme.sizing.scale600,
    marginBottom: theme.sizing.scale500,
    overflowX: 'scroll',
  });
  if (!error) return null;
  return <div className={errorCx}>{frameError(error, code)}</div>;
};

export default Error;
