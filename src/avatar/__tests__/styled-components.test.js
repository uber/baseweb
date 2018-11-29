/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {shallow} from 'enzyme';
import {StyledAvatar, StyledRoot} from '../index';

describe('Avatar styled components', () => {
  const styledComponents = [
    [StyledAvatar, 'StyledAvatar'],
    [StyledRoot, 'StyledRoot'],
  ];

  test.each(styledComponents)('default properties', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected default styles`,
    );
  });

  test.each(styledComponents)('non-default size', (Component, name) => {
    const component = shallow(<Component $size="scale1200" />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles with non-default size`,
    );
  });

  it('StyledRoot failure state', () => {
    const component = shallow(<StyledRoot $didImageFailToLoad />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledRoot has expected failure state styles',
    );
  });
});
