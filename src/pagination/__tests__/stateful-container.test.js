/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import * as React from 'react';
import {mount} from 'enzyme';
import {STATE_CHANGE_TYPE} from '../constants.js';
import StatefulContainer from '../stateful-container.js';

const mockChildrenFn = jest.fn().mockImplementation(() => <div />);
const mockOnPageChangeFn = jest.fn();
const mockStateReducerFn = jest
  .fn()
  .mockImplementation((changeType, changes) => (changes: any));

function getSharedProps() {
  return {
    numPages: 7,
    children: mockChildrenFn,
    onPageChange: mockOnPageChangeFn,
    stateReducer: mockStateReducerFn,
  };
}

describe('Pagination StatefulContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders and passes required props to children function', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    expect(mockChildrenFn.mock.calls[0][0]).toEqual({
      currentPage: 1,
      onPageChange: component.instance().onPageChange,
    });
  });

  test('with initialState', () => {
    const props = {
      ...getSharedProps(),
      initialState: {
        currentPage: 5,
      },
    };
    const component = mount(<StatefulContainer {...props} />);
    expect(component.state('currentPage')).toBe(5);
  });

  test('onPageChange called if and only if page has changed', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    const instance = component.instance();
    // $FlowFixMe
    instance.onPageChange({nextPage: 5});
    expect(component.state('currentPage')).toBe(5);
    expect(mockOnPageChangeFn.mock.calls.length).toBe(1);
    // Invoke again with same page
    // $FlowFixMe
    instance.onPageChange({nextPage: 5});
    expect(mockOnPageChangeFn.mock.calls.length).toBe(1);
  });

  test('internalSetState calls stateReducer with the correct args', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    component.instance().internalSetState(STATE_CHANGE_TYPE.changePage, {
      currentPage: 2,
    });
    expect(mockStateReducerFn.mock.calls[0][0]).toEqual(
      STATE_CHANGE_TYPE.changePage,
    );
    expect(mockStateReducerFn.mock.calls[0][1]).toEqual({currentPage: 2});
  });

  test('internalSetState should still call setState with no stateReducer', () => {
    const props = {
      ...getSharedProps(),
      stateReducer: null,
    };
    // $FlowFixMe
    const component = mount(<StatefulContainer {...props} />);
    component.instance().internalSetState(STATE_CHANGE_TYPE.changePage, {
      currentPage: 2,
    });
    expect(component.state('currentPage')).toBe(2);
  });
});
