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
  StyledPanelContainer,
  StyledHeader,
  StyledToggleIcon,
  StyledContent,
} from '../index.js';

const styledComponents = [
  [StyledRoot, 'StyledRoot'],
  [StyledPanelContainer, 'StyledPanelContainer'],
  [StyledHeader, 'StyledHeader'],
  [StyledToggleIcon, 'StyledToggleIcon'],
  [StyledContent, 'StyledContent'],
];

describe('Accordion styled components', () => {
  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component $disabled={false} $expanded={true} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles when expanded is set to true`,
    );
  });

  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(
      <Component $disabled={false} $expanded={false} />,
    );
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles when expanded is set to false`,
    );
  });

  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component $disabled={true} $expanded={false} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles when not expanded and disabled is set to true`,
    );
  });

  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component $disabled={true} $expanded={true} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles when expanded and disabled is set to true`,
    );
  });
});
