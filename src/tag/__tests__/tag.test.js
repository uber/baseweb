/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Tag, StyledAction} from '../index.js';
import type {TagKindT} from '../index.js';

describe('Stateless tag', function() {
  let wrapper,
    events = {},
    children;
  let allProps: any = {},
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    events = {
      onActionClick: mockFn,
    };
    allProps = {
      ...events,
    };
    children = 'Some tag';
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should render component', function() {
    wrapper = mount(<Tag {...allProps}>{children}</Tag>);
    expect(wrapper).toMatchSnapshot('Component has correct render');
  });

  describe('On disabled', function() {
    beforeEach(function() {
      allProps.onActionClick = jest.fn();
      wrapper = mount(
        <Tag {...allProps} disabled>
          {children}
        </Tag>,
      );
    });

    test('should not render a11y attributes', function() {
      const tag = wrapper.getDOMNode();
      const closeBtn = tag.children[1];
      expect(tag.getAttribute('aria-label')).toBeNull();
      expect(tag.getAttribute('role')).toBeNull();
      expect(closeBtn.getAttribute('aria-label')).toBeNull();
      expect(closeBtn.getAttribute('role')).toBeNull();
    });
  });

  describe('On action', function() {
    beforeEach(function() {
      allProps.onActionClick = jest.fn();
      allProps.onClick = jest.fn();
      wrapper = mount(<Tag {...allProps}>{children}</Tag>);
    });

    test('should call callback if action button is clicked', function() {
      const actionIcon = wrapper.find(StyledAction);
      actionIcon.first().simulate('click');
      expect(allProps.onClick).not.toHaveBeenCalled();
      expect(allProps.onActionClick).toHaveBeenCalledWith(
        allProps.onActionClick.mock.calls[0][0],
      );
    });
  });

  describe('tag flow validation', function() {
    // https://github.com/uber/baseweb/issues/1910
    // eslint-disable-next-line no-unused-vars
    function TagWrapper(props: {kind: TagKindT}) {
      return <Tag kind={props.kind} />;
    }
  });
});
