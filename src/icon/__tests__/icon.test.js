/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {Icon} from '../index.js';
import {Svg} from '../styled-components.js';
import * as Icons from '../icon-exports.js';

import {ThemeProvider} from '../../styles/index.js';
import {lightThemePrimitives, createTheme} from '../../themes/index.js';

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

  test('does not pass dollar prefix props to globally overridden icons', () => {
    const IconMock = jest.fn(() => <div>mock</div>);
    const customTheme = createTheme(lightThemePrimitives, {
      icons: {Alert: IconMock},
    });

    mount(
      <ThemeProvider theme={customTheme}>
        <Icons.Alert $size="12px" size="12px" />
      </ThemeProvider>,
    );

    expect(IconMock.mock.calls[0][0]).toHaveProperty('size', '12px');
    expect(IconMock.mock.calls[0][0]).not.toHaveProperty('$size');
  });
});
