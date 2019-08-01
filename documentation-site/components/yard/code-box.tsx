import * as React from 'react';
import {useStyletron} from 'baseui';

const CodeBox = ({children}: {children: React.ReactNode}) => {
  const [css, theme] = useStyletron();
  const isLight = theme.name.startsWith('light-theme');
  return (
    <div
      className={css({
        overflow: 'scroll',
        borderLeft: `5px solid ${
          isLight ? theme.colors.warning200 : theme.colors.mono500
        }`,
        backgroundColor: isLight ? 'rgb(253, 253, 253)' : '#292929',
        paddingLeft: theme.sizing.scale400,
        marginBottom: theme.sizing.scale600,
        marginTop: theme.sizing.scale600,
      })}
    >
      {children}
    </div>
  );
};

export default CodeBox;
