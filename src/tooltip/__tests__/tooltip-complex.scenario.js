/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTooltip} from '../index.js';
import {StyledLink} from '../../link/index.js';
import {DarkTheme} from '../../themes/index.js';
import {ThemeProvider} from '../../styles/index.js';

function ComplexContent() {
  return (
    <ThemeProvider theme={DarkTheme}>
      Please click this link here:{` `}
      <StyledLink href="#">Click Me!</StyledLink>
    </ThemeProvider>
  );
}

export default function Scenario() {
  return (
    <StatefulTooltip accessibilityType={'tooltip'} content={ComplexContent}>
      <span>such as this</span>
    </StatefulTooltip>
  );
}
