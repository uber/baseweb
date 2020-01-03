/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {
  Panel,
  StyledContent,
  StyledHeader,
  StyledToggleIcon,
} from '../index.js';

describe('Panel', () => {
  test('basic rendering', () => {
    const props = {
      title: 'title',
      children: 'content',
    };
    let renderedHeader;
    let renderedContent;
    let renderedToggleIcon;
    const wrapper = mount(<Panel {...props} />);
    renderedHeader = wrapper.find(StyledHeader).first();
    renderedToggleIcon = wrapper.find(StyledToggleIcon).first();
    renderedContent = wrapper.find(StyledContent).first();
    expect(renderedHeader).toExist();
    expect(renderedHeader.props()).toMatchSnapshot('Header has correct props');
    expect(renderedToggleIcon).toExist();
    expect(renderedContent).toExist();
    expect(renderedContent.props()).toMatchSnapshot(
      'Content has correct props',
    );
  });

  test('aria-controls populated when provided', () => {
    const props = {
      onChange: jest.fn(),
      onKeyDown: jest.fn(),
      children: 'content',
      'aria-controls': 'panel',
      title: 'title',
    };
    let renderedHeader;
    let renderedContent;
    const wrapper = mount(<Panel {...props} />);
    renderedHeader = wrapper.find(StyledHeader).first();
    renderedContent = wrapper.find(StyledContent).first();
    expect(renderedHeader).toExist();
    expect(renderedHeader).toMatchSnapshot(
      'Header has correct props w/ aria-controls',
    );
    expect(renderedContent).toExist();
    expect(renderedContent).toMatchSnapshot('Content has correct props w/ ID');
  });

  test('component overrides', () => {
    const overrides = {
      Header: jest
        .fn()
        .mockImplementation(({children}) => <span>{children}</span>),
    };
    // $FlowFixMe
    const wrapper = mount(<Panel overrides={overrides}>Content</Panel>);
    // $FlowFixMe
    const header = wrapper.find(overrides.Header);
    expect(header).toHaveLength(1);
  });

  test('onChange is called on a click event', () => {
    const props = {
      onChange: jest.fn(),
      onClick: jest.fn(),
      title: 'title',
    };
    const wrapper = mount(<Panel {...props}>Content</Panel>);
    const header = wrapper.find(StyledHeader);
    header.simulate('click');
    expect(props.onChange).toHaveBeenCalledWith({expanded: true});
    expect(props.onClick).toHaveBeenCalled();
  });

  test('onChange is called on a Enter keydown event', () => {
    const props = {
      onChange: jest.fn(),
      onKeyDown: jest.fn(),
      title: 'title',
    };
    const event = {key: 'Enter'};
    const wrapper = mount(<Panel {...props}>Content</Panel>);
    const header = wrapper.find(StyledHeader);
    header.simulate('keydown', event);
    expect(props.onChange).toHaveBeenCalledWith({expanded: true});
    expect(props.onKeyDown).toHaveBeenCalled();
  });

  test('onChange is called on a Space keydown event', () => {
    const props = {
      onChange: jest.fn(),
      onKeyDown: jest.fn(),
      title: 'title',
    };
    const event = {which: 32};
    const wrapper = mount(<Panel {...props}>Content</Panel>);
    const header = wrapper.find(StyledHeader);
    header.simulate('keydown', event);
    expect(props.onChange).toHaveBeenCalledWith({expanded: true});
    expect(props.onKeyDown).toHaveBeenCalled();
  });
});
