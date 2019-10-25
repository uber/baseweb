import * as React from 'react';
import {useValueDebounce} from './utils';
import SimpleEditor from 'react-simple-code-editor';
import Highlight, {Prism} from 'prism-react-renderer';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import {useStyletron} from 'baseui';

type TransformTokenT = (tokenProps: {
  // https://github.com/FormidableLabs/prism-react-renderer/blob/86c05728b6cbea735480a8354546da77ae8b00d9/src/types.js#L64
  style?: {[key: string]: string | number | null};
  className: string;
  children: string;
  [key: string]: any;
}) => React.ReactNode;

const highlightCode = (
  code: string,
  theme: typeof lightTheme,
  transformToken?: TransformTokenT,
) => (
  <Highlight Prism={Prism} code={code} theme={theme} language="jsx">
    {({tokens, getLineProps, getTokenProps}) => (
      <React.Fragment>
        {tokens.map((line, i) => (
          <div {...getLineProps({line, key: i})}>
            {line.map((token, key) => {
              const tokenProps = getTokenProps({token, key});

              if (transformToken) {
                return transformToken(tokenProps);
              }
              return <span {...tokenProps} />;
            })}
          </div>
        ))}
      </React.Fragment>
    )}
  </Highlight>
);

const Editor: React.FC<{
  code: string;
  transformToken?: TransformTokenT;
  placeholder?: string;
  onChange: (code: string) => void;
  small?: boolean;
}> = ({code: globalCode, transformToken, onChange, placeholder, small}) => {
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

  const [code, setCode] = useValueDebounce<string>(globalCode, onChange);

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
        highlight={code => highlightCode(code, editorTheme, transformToken)}
        onValueChange={code => setCode(code)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        padding={small ? 4 : 12}
        style={editorTheme.plain as any}
      />
    </div>
  );
};
export default Editor;
