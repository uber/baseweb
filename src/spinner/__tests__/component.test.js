/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {Spinner} from '../index.js';
import {Icon} from '../../icon/index.js';

describe('Spinner', () => {
  test('color can be changed through props', () => {
    let renderedIcon;
    const spinner = mount(<Spinner color="red" />);

    renderedIcon = spinner.find(Icon).first();
    expect(renderedIcon).toExist();

    expect(renderedIcon.props().color).toBe('red');
  });

  test('size can be changed through props', () => {
    let renderedIcon;
    const spinner = mount(<Spinner size="10px" />);

    renderedIcon = spinner.find(Icon).first();
    expect(renderedIcon).toExist();

    expect(renderedIcon.props().size).toBe('10px');
  });

  test('component overrides', () => {
    const overrides = {
      Svg: jest.fn().mockImplementation(({children}) => <svg>{children}</svg>),
    };
    const wrapper = mount(
      // $FlowFixMe
      <Spinner overrides={overrides} />,
    );
    // $FlowFixMe
    const root = wrapper.find(overrides.Svg);
    expect(root).toHaveLength(1);
  });
});
