import * as React from 'react';
import {Input, SIZE} from 'baseui/input';
import {useStyletron} from 'baseui';
import Link from 'next/link';
import {StyledLink} from 'baseui/link';
import {Caption1} from 'baseui/typography';

type ThemeEditorProps = {
  componentName: string;
  theme: {[key: string]: string};
  themeInit: {[key: string]: string};
  set: (value: {[key: string]: string}) => void;
};

type ColumnProps = {
  themeKeys: string[];
  theme: {[key: string]: string};
  themeInit: {[key: string]: string};
  set: (value: {[key: string]: string}) => void;
};

const Column: React.FC<ColumnProps> = ({themeKeys, themeInit, theme, set}) => {
  const [useCss, $theme] = useStyletron();
  return (
    <div
      className={useCss({
        flexBasis: '50%',
      })}
    >
      {themeKeys.map(key => {
        return (
          <label
            key={key}
            className={useCss({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <div
              className={useCss({
                width: '4px',
                height: '36px',
                backgroundColor: theme[key],
              })}
            ></div>
            <Input
              positive={theme[key] !== themeInit[key]}
              size={SIZE.compact}
              placeholder={themeInit[key]}
              value={theme[key]}
              onChange={e =>
                set({...theme, [key]: (e.target as HTMLInputElement).value})
              }
              overrides={{Root: {style: {width: '100px'}}}}
            />
            <div
              title={key}
              className={useCss({
                ...($theme.typography.font100 as any),
                color: $theme.colors.foreground,
                marginLeft: $theme.sizing.scale300,
                maxWidth: '150px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              })}
            >
              {key}
            </div>
          </label>
        );
      })}
    </div>
  );
};

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  theme,
  themeInit,
  set,
  componentName,
}) => {
  const [useCss] = useStyletron();
  const themeKeys = Object.keys(theme);

  const midPoint =
    themeKeys.length % 2 === 0
      ? themeKeys.length / 2
      : themeKeys.length / 2 + 1;
  const firstThemeKeys = themeKeys.slice(0, midPoint);
  const secondThemeKeys = themeKeys.slice(midPoint);

  return (
    <React.Fragment>
      <Caption1
        marginLeft="scale200"
        marginRight="scale200"
        marginBottom="scale400"
      >
        Do you want to change {componentName} colors globally? You can customize
        the theme through ThemeProvider and set your own colors.{' '}
        <Link href="/guides/theming#creating-a-custom-theme">
          <StyledLink href="/guides/theming#creating-a-custom-theme">
            Learn more
          </StyledLink>
        </Link>
        . Try different values:
      </Caption1>
      <div
        className={useCss({
          display: 'flex',
          flexDirection: 'row',
        })}
      >
        <Column
          themeKeys={firstThemeKeys}
          theme={theme}
          themeInit={themeInit}
          set={set}
        />
        <Column
          themeKeys={secondThemeKeys}
          theme={theme}
          themeInit={themeInit}
          set={set}
        />
      </div>
    </React.Fragment>
  );
};

export default ThemeEditor;
