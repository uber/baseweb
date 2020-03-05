/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {withStyle} from '../../styles/index.js';
import {StyledTable, StyledBody, StyledRow, StyledCell} from '../index.js';

const Cell = withStyle(StyledCell, props => {
  return {color: 'seagreen'};
});

export default function Scenario() {
  const cellRef = React.useRef(null);
  return (
    <StyledTable>
      <StyledBody>
        <StyledRow>
          <Cell ref={cellRef}>Hello</Cell>
          <Cell $style={{color: 'firebrick'}}>Hello</Cell>
          <StyledCell>Hello</StyledCell>
        </StyledRow>
      </StyledBody>
    </StyledTable>
  );
}
