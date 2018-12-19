/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledRoot,
  StyledCalendarContainer,
  StyledHeader,
  StyledMonthHeader,
  StyledMonth,
  StyledWeek,
  StyledDay,
} from '../index.js';

const styledComponents = [
  [StyledRoot, 'StyledRoot'],
  [StyledCalendarContainer, 'StyledCalendarContainer'],
  [StyledHeader, 'StyledHeader'],
  [StyledMonthHeader, 'StyledMonthHeader'],
  [StyledMonth, 'StyledMonth'],
  [StyledWeek, 'StyledWeek'],
  [StyledDay, 'StyledDay'],
];

const props = [
  ['$disabled'],
  ['$isHighlighted'],
  ['$isHovered'],
  ['$outsideMonth'],
  ['$selected'],
];

describe('Component styled components', () => {
  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles`,
    );
  });

  test.each(props)('Prop based styles', prop => {
    const component = shallow(<StyledDay {...{[prop]: true}} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `StyledDay has correct styles when ${prop} is set to true`,
    );
  });
});
