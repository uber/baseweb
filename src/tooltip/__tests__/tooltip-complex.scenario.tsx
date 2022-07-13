/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulTooltip } from '..';
import { StyledLink } from '../../link';
import { DarkTheme } from '../../themes';
import { ThemeProvider, useStyletron } from '../../styles';

function ComplexContent() {
  return (
    <ThemeProvider theme={DarkTheme}>
      feat: super cool feature{` `}
      <StyledLink href="#">#123</StyledLink>
    </ThemeProvider>
  );
}

export function Scenario() {
  const [css, theme] = useStyletron();
  return (
    <React.Fragment>
      This {` `}
      <StatefulTooltip
        accessibilityType={'tooltip'}
        content={ComplexContent}
        showArrow
        autoFocus
        focusLock
      >
        <span
          className={css({
            borderBottomWidth: '1px',
            borderBottomStyle: 'dotted',
            borderBottomColor: `${theme.colors.primary500}`,
            color: theme.colors.primary500,
          })}
        >
          commit
        </span>
      </StatefulTooltip>
      {` `}introduced a new feature.
    </React.Fragment>
  );
}
