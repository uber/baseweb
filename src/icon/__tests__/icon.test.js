/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import React from 'react';
import {shallow} from 'enzyme';
import {Icon} from '../index.js';
import {Svg} from '../styled-components.js';
import * as Icons from '../icon-exports.js';

describe('Icon', () => {
  test('renders an icon with viewBox and title', () => {
    const wrapper = shallow(
      <Icon viewBox="0 0 23px 23px" title="Test">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        />
      </Icon>,
    );

    expect(wrapper).toMatchSnapshot('Icon basic render');
  });

  test('supports overrides', () => {
    const wrapper = shallow(
      <Icon overrides={{Svg: {style: {fill: 'purple'}}}}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        />
      </Icon>,
    );

    expect(wrapper.find(Svg).prop('$style')).toEqual({fill: 'purple'});
  });

  // Test that all the icons render
  Object.keys(Icons).forEach(key => {
    const Component = Icons[key];
    test(`renders ${key} icon`, () => {
      const wrapper = shallow(<Component />);
      expect(wrapper).toExist();
    });
  });
});
