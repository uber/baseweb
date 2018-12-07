/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';
import {Component, StyledRoot} from '../index.js';

describe('Component', () => {
  test('basic click functionality', () => {
    let renderedRoot;
    const onClick = jest.fn();
    const wrapper = mount(<Component onClick={onClick} />);

    renderedRoot = wrapper.find(StyledRoot).first();
    expect(renderedRoot).toExist();

    // pass new prop value set to false
    wrapper.setProps({prop: false});

    renderedRoot = wrapper.find(StyledRoot).first();
    expect(renderedRoot.props().$prop).toBe(false);
  });

  test('component overrides', () => {
    const overrides = {
      Root: jest
        .fn()
        .mockImplementation(({children}) => <span>{children}</span>),
    };

    const wrapper = mount(
      // $FlowFixMe
      <Component overrides={overrides} />,
    );

    const root = wrapper.find(overrides.Root);
    expect(root).toHaveLength(1);
  });
});
