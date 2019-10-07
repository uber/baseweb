import * as React from 'react';
import debounce from 'lodash/debounce';
import SimpleEditor from 'react-simple-code-editor';
import Highlight, {Prism} from 'prism-react-renderer';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import {useStyletron} from 'baseui';

const highlightCode = (code: string, theme: typeof lightTheme) => (
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
  placeholder?: string;
  onChange: (code: string) => void;
  small?: boolean;
}> = ({code: globalCode, onChange, placeholder, small}) => {
  const [css, theme] = useStyletron();
  const [focused, setFocused] = React.useState(false);
  const plainStyles = theme.name.startsWith('light-theme')
    ? lightTheme
    : darkTheme;
  const editorTheme = {
    ...plainStyles,
    plain: {
      ...plainStyles.plain,
      fontSize: small ? '13px' : '14px',
      whiteSpace: 'break-spaces',
      backgroundColor: focused
        ? theme.colors.inputFillActive
        : theme.colors.inputFill,
    },
  };

  // debouncing editor code updates
  const [code, setCode] = React.useState(globalCode);
  const debouncedOnChange = React.useRef(debounce(onChange, 300)).current;
  React.useEffect(() => {
    setCode(globalCode);
  }, [globalCode]);

  return (
    <div
      className={css({
        boxSizing: 'border-box',
        backgroundColor: editorTheme.plain.backgroundColor,
        paddingLeft: '4px',
        paddingRight: '4px',
        height: small && !focused ? '36px' : 'auto',
        maxWidth: small ? '255px' : 'auto',
        overflow: 'hidden',
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
        value={code || ''}
        placeholder={placeholder}
        highlight={code => highlightCode(code, editorTheme)}
        onValueChange={code => {
          setCode(code);
          debouncedOnChange(code);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        padding={small ? 4 : 12}
        style={editorTheme.plain as any}
      />
    </div>
  );
};
export default Editor;
