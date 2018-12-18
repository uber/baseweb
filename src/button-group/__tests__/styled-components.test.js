/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';

import {StyledRoot} from '../index.js';

describe('ButtonGroup styled components', () => {
  const styledComponents = [[StyledRoot, 'StyledRoot']];

  test.each(styledComponents)('default styled', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected default styles`,
    );
  });

  test.each(styledComponents)('first', (Component, name) => {
    const component = shallow(<Component $first />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when first element in group`,
    );
  });

  test.each(styledComponents)('last', (Component, name) => {
    const component = shallow(<Component $last />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when last element in group`,
    );
  });
});
