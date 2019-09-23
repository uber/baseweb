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
}> = ({code, onChange}) => {
  const [css, theme] = useStyletron();
  const [focused, setFocused] = React.useState(false);
  const plainStyles = theme.name.startsWith('light-theme')
    ? lightTheme
    : darkTheme;
  const editorTheme = {
    ...plainStyles,
    plain: {
      ...plainStyles.plain,
      backgroundColor: focused
        ? theme.colors.inputFillActive
        : theme.colors.inputFill,
    },
  };

  return (
    <div
      className={css({
        boxSizing: 'border-box',
        border: focused
          ? `2px solid ${theme.colors.borderFocus}`
          : `2px solid ${theme.colors.inputFill}`,
      })}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `.npm__react-simple-code-editor__textarea { outline: none !important }`,
        }}
      />
      <SimpleEditor
        value={code}
        highlight={code => highlightCode(code, editorTheme)}
        onValueChange={code => onChange(code)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        padding={10}
        style={editorTheme.plain}
      />
    </div>
  );
};
export default Editor;
