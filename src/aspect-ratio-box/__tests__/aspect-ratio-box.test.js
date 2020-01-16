/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import AspectRatioBox from '../aspect-ratio-box.js';

describe('AspectRatioBox', () => {
  it('renders', () => {
    const wrapper = mount(<AspectRatioBox />);
    expect(wrapper).toMatchSnapshot('for aspectRatio={1}');

    wrapper.setProps({aspectRatio: 16 / 9});
    expect(wrapper).toMatchSnapshot('for aspectRatio={16 / 9}');

    wrapper.setProps({
      overrides: {
        Block: {style: {marginBottom: '10px'}},
      },
    });
    expect(wrapper).toMatchSnapshot('with overridden styles');
  });
});
