/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {Button} from '../../button/index.js';
import {Filter, StyledFilterButton, StyledFilterContent} from '../index.js';

describe('Table-Filter', () => {
  it('does not display filter content by default', () => {
    const wrapper = mount(<Filter>hello</Filter>);
    const content = wrapper.find(StyledFilterContent);
    expect(content).not.toExist();
  });

  it('displays filter content on click', () => {
    const children = 'hello';
    const wrapper = mount(<Filter>{children}</Filter>);
    const icon = wrapper.find(StyledFilterButton);
    icon.simulate('click');

    const content = wrapper.find(StyledFilterContent);
    expect(content).toExist();
    expect(content.text()).toBe(children);
  });

  it('does not display filter content if disabled', () => {
    const wrapper = mount(<Filter disabled>hello</Filter>);
    const icon = wrapper.find(StyledFilterButton);
    icon.simulate('click');

    const content = wrapper.find(StyledFilterContent);
    expect(content).not.toExist();
  });

  it('calls provided onSelectAll handler', () => {
    const spy = jest.fn();
    const wrapper = mount(<Filter onSelectAll={spy}>hello</Filter>);
    const icon = wrapper.find(StyledFilterButton);
    icon.simulate('click');

    const button = wrapper.find(Button).at(0);
    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('calls provided onReset handler', () => {
    const spy = jest.fn();
    const wrapper = mount(<Filter onReset={spy}>hello</Filter>);
    const icon = wrapper.find(StyledFilterButton);
    icon.simulate('click');

    const button = wrapper.find(Button).at(1);
    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
