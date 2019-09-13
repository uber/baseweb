import * as React from 'react';
import SimpleEditor from 'react-simple-code-editor';
import Highlight, {Prism} from 'prism-react-renderer';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import {useStyletron} from 'baseui';

const highlightCode = (code: string, theme: any) => (
  <Highlight Prism={Prism} code={code} theme={theme} language="jsx">
    {({tokens, getLineProps, getTokenProps}) => (
      <React.Fragment>
        {tokens.map((line, i) => (
          <div {...getLineProps({line, key: i})}>
            {line.map((token, key) => (
              <span {...getTokenProps({token, key})} />
            ))}
          </div>
        ))}
      </React.Fragment>
    )}
  </Highlight>
);

const Editor: React.FC<{
  code: string;
  onChange: (code: string) => void;
  focused: boolean;
}> = ({code, onChange, focused}) => {
  const [, theme] = useStyletron();
  const editorTheme = theme.name.startsWith('light-theme')
    ? {
        ...lightTheme,
        plain: {
          ...lightTheme.plain,
          backgroundColor: theme.colors.mono200,
        },
      }
    : {
        ...darkTheme,
        plain: {
          ...darkTheme.plain,
          backgroundColor: focused ? '#3D3D3D' : '#292929',
        },
      };

  return (
    <SimpleEditor
      value={code}
      highlight={code => highlightCode(code, editorTheme)}
      onValueChange={code => onChange(code)}
      padding={10}
      style={editorTheme.plain}
    />
  );
};
export default Editor;
