/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {shallow} from 'enzyme';
import {Svg} from '../styled-components';

describe('Icon styled components', () => {
  test('Svg has correct default styles', () => {
    const wrapper = shallow(<Svg />);

    expect(wrapper.instance().getStyles()).toMatchSnapshot('Svg basic render');
  });

  test('Svg handles color override', () => {
    const wrapper = shallow(<Svg $color="purple" />);
    expect(wrapper.instance().getStyles()).toHaveProperty('fill', 'purple');
  });

  test('Svg handles size via theme constant', () => {
    const wrapper = shallow(<Svg $size="scale400" />);
    const styles = wrapper.instance().getStyles();
    expect(styles).toHaveProperty('width', '$theme.sizing.scale400');
    expect(styles).toHaveProperty('height', '$theme.sizing.scale400');
  });
});
