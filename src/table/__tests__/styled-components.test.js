/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledFilterButton,
  StyledFilterContent,
  StyledFilterHeading,
  StyledFilterFooter,
  StyledAction,
} from '../index.js';

describe('Table styled components', () => {
  const styledComponents = [
    [StyledTable, 'StyledTable'],
    [StyledHead, 'StyledHead'],
    [StyledHeadCell, 'StyledHeadCell'],
    [StyledBody, 'StyledBody'],
    [StyledRow, 'StyledRow'],
    [StyledCell, 'StyledCell'],
    [StyledFilterButton, 'StyledFilterButton'],
    [StyledFilterContent, 'StyledFilterContent'],
    [StyledFilterHeading, 'StyledFilterHeading'],
    [StyledFilterFooter, 'StyledFilterFooter'],
    [StyledAction, 'StyledAction'],
  ];

  test.each(styledComponents)('default properties', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected default styles`,
    );
  });

  test.each(styledComponents)('$width property', (Component, name) => {
    const component = shallow(<Component $width="1000px" />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when $width property defined`,
    );
  });
});
