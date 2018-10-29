/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';
import {Spinner} from '../index';
import {Spinner as SpinnerIcon} from '../../icon';

describe('Spinner', () => {
  test('renders spinner icon', () => {
    let renderedIcon;
    const spinner = mount(<Spinner />);

    // renderedRoot = wrapper.find(StyledSvg).first();
    renderedIcon = spinner.find(SpinnerIcon).first();
    expect(renderedIcon).toExist();

    // pass new size value set to 56
    spinner.setProps({size: 56});

    renderedIcon = spinner.find(SpinnerIcon).first();
    expect(renderedIcon.props().size).toBe(56);
  });

  test('component overrides', () => {
    const overrides = {
      Svg: jest.fn().mockImplementation(({children}) => <svg>{children}</svg>),
    };
    const wrapper = mount(
      // $FlowFixMe
      <Spinner overrides={overrides} />,
    );
    const root = wrapper.find(overrides.Svg);
    expect(root).toHaveLength(1);
  });
});
