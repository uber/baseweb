/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {StyledTab} from '../index.js';

import {default as Tab} from '../tab.js';

describe('Tab', () => {
  test('basic rendering', () => {
    const props = {
      active: true,
      children: 'title',
    };
    let renderedTab;
    const wrapper = mount(<Tab {...props} />);
    renderedTab = wrapper.find(StyledTab).first();
    expect(renderedTab.props()).toMatchSnapshot('styled tab has correct props');
  });

  test('component overrides', () => {
    const overrides = {
      // eslint-disable-next-line react/display-name
      Tab: ({children}) => <span>{children}</span>,
    };
    const wrapper = mount(<Tab overrides={overrides}>Title</Tab>);
    const tab = wrapper.find(overrides.Tab);
    expect(tab).toHaveLength(1);
  });

  test('onSelect and onClick are called on a click event', () => {
    const props = {
      onSelect: jest.fn(),
      onClick: jest.fn(),
    };
    const wrapper = mount(<Tab {...props}>Title</Tab>);
    const tab = wrapper.find(StyledTab);
    tab.simulate('click');
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  test('onSelect and onKeydown are called on a Enter keydown event', () => {
    const props = {
      onSelect: jest.fn(),
      onKeyDown: jest.fn(),
    };
    const event = {key: 'Enter'};
    const wrapper = mount(<Tab {...props}>Title</Tab>);
    const tab = wrapper.find(StyledTab);
    tab.simulate('keydown', event);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onKeyDown).toHaveBeenCalledTimes(1);
  });

  test('onSelect and onKeydown are called on a Space keydown event', () => {
    const props = {
      onSelect: jest.fn(),
      onKeyDown: jest.fn(),
    };
    const event = {which: 32};
    const wrapper = mount(<Tab {...props}>Title</Tab>);
    const tab = wrapper.find(StyledTab);
    tab.simulate('keydown', event);
    expect(props.onSelect).toHaveBeenCalledTimes(1);
    expect(props.onKeyDown).toHaveBeenCalledTimes(1);
  });

  test('onClick is not called when the tab is disabled', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<Tab {...props}>Title</Tab>);
    const tab = wrapper.find(StyledTab);
    tab.simulate('click');
    expect(props.onClick).not.toHaveBeenCalledTimes(1);
  });

  test('onSelect nor onKeydown is not called on key presses when the tab is disabled', () => {
    const props = {
      onSelect: jest.fn(),
      onKeyDown: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<Tab {...props}>Title</Tab>);
    const tab = wrapper.find(StyledTab);
    tab.simulate('keydown', {key: 'Enter'});
    tab.simulate('keydown', {which: 32});
    expect(props.onSelect).not.toHaveBeenCalledTimes(1);
    expect(props.onKeyDown).not.toHaveBeenCalledTimes(1);
  });
});
