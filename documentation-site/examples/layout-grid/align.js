// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {
  Unstable_Grid as Grid,
  Unstable_Cell as Cell,
  ALIGNMENT,
} from 'baseui/layout-grid';

export default () => (
  <Outer>
    <Grid align={ALIGNMENT.center}>
      <Cell span={[1, 2, 3]}>
        <Inner h={28}>1</Inner>
      </Cell>
      <Cell span={[1, 2, 3]}>
        <Inner h={52}>2</Inner>
      </Cell>
      <Cell span={[1, 2, 3]}>
        <Inner h={34}>3</Inner>
      </Cell>
    </Grid>
  </Outer>
);

const Outer: React.StatelessFunctionalComponent<{
  children: React.Node,
}> = ({children}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        background: theme.colors.accent100,
      })}
    >
      {children}
    </div>
  );
};

const Inner: React.StatelessFunctionalComponent<{
  children: React.Node,
  h: number,
}> = ({children, h = 50}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.colors.accent200,
        color: theme.colors.accent700,
        padding: '.25rem',
        height: h + 'px',
      })}
    >
      {children}
    </div>
  );
};
