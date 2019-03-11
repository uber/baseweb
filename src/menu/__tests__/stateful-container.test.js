/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import React from 'react';
import {mount} from 'enzyme';
import StatefulContainer from '../stateful-container.js';
import {KEY_STRINGS, STATE_CHANGE_TYPES} from '../constants.js';
import {scrollItemIntoView} from '../utils.js';

jest.mock('../utils');

const mockItems = [{label: 'item1'}, {disabled: true, label: 'item2'}];
const mockChildrenFn = jest.fn().mockImplementation(() => <div />);
const mockItemSelect = jest.fn();

const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;

function getSharedProps() {
  return {
    items: mockItems,
    onItemSelect: mockItemSelect,
    children: mockChildrenFn,
    stateReducer: jest
      .fn()
      .mockImplementation((changeType, changes) => changes),
  };
}

describe('Menu StatefulContainer', () => {
  beforeAll(() => {
    // $FlowFixMe
    document.addEventListener = jest.fn();
    // $FlowFixMe
    document.removeEventListener = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // $FlowFixMe
    document.addEventListener = originalAddEventListener;
    // $FlowFixMe
    document.removeEventListener = originalRemoveEventListener;
  });

  test('renders and passes required props to children function', () => {
    const props = {
      items: mockItems,
      onItemSelect: mockItemSelect,
      children: mockChildrenFn,
    };
    const component = mount(<StatefulContainer {...props} />);
    expect(component.instance().refList).toEqual([]);
    expect(component.instance().rootRef).toEqual(React.createRef());
    expect(mockChildrenFn.mock.calls[0][0]).toEqual({
      highlightedIndex: -1,
      items: mockItems,
      rootRef: React.createRef(),
      getRequiredItemProps: component.instance().getRequiredItemProps,
    });
  });

  test('with initialState', () => {
    const props = {
      ...getSharedProps(),
      initialState: {
        highlightedIndex: 5,
      },
    };
    const component = mount(<StatefulContainer {...props} />);
    expect(component.state('highlightedIndex')).toBe(5);
  });

  test('add and remove event listeners', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    expect(document.addEventListener.mock.calls.length).toBe(1);
    component.unmount();
    expect(document.removeEventListener.mock.calls.length).toBe(1);
  });

  test('getRequiredItemProps returns correct props', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    const item = mockItems[0];
    const props = component.instance().getRequiredItemProps(item, 0);
    expect(props).toEqual({
      ref: React.createRef(),
      isHighlighted: false,
      onClick: props.onClick,
    });
    props.onClick();
    expect(mockItemSelect.mock.calls[0][0]).toEqual({
      item,
    });
  });

  test('getRequiredItemProps returns correct props for disabled item', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    const item = mockItems[1];
    const props = component.instance().getRequiredItemProps(item, 1);
    expect(props).toEqual({
      disabled: true,
      ref: React.createRef(),
      isHighlighted: false,
    });
  });

  test('getRequiredItemProps returns correct props for active child', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    component.setState({
      highlightedIndex: 0,
    });
    const item = mockItems[0];
    const props = component.instance().getRequiredItemProps(item, 0);
    expect(props).toEqual({
      ref: React.createRef(),
      isHighlighted: true,
      onClick: props.onClick,
    });
  });

  test('onKeyDown - handleArrowKey', () => {
    const props = getSharedProps();
    const component = mount(<StatefulContainer {...props} />);
    expect(component.state('highlightedIndex')).toEqual(-1);

    component.instance().refList = [React.createRef(), React.createRef()];
    component.instance().onKeyDown({
      key: KEY_STRINGS.ArrowUp,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });
    expect(component.state('highlightedIndex')).toEqual(0);
    expect(props.stateReducer.mock.calls[0]).toEqual([
      STATE_CHANGE_TYPES.moveUp,
      {highlightedIndex: 0},
      {highlightedIndex: -1},
    ]);
    const parent = React.createRef();
    const child = React.createRef();
    // $FlowFixMe
    expect(scrollItemIntoView.mock.calls[0][0]).toEqual(
      child.current,
      parent.current,
      true,
      false,
    );

    component.instance().onKeyDown({
      key: KEY_STRINGS.ArrowDown,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });
    expect(component.state('highlightedIndex')).toEqual(1);
    expect(props.stateReducer.mock.calls[1]).toEqual([
      STATE_CHANGE_TYPES.moveDown,
      {highlightedIndex: 1},
      {highlightedIndex: 0},
    ]);
  });

  test('onKeyDown - handleEnterKey', () => {
    const props = getSharedProps();
    const component = mount(<StatefulContainer {...props} />);
    const event = {
      key: KEY_STRINGS.Enter,
      preventDefault: jest.fn(),
    };
    component.instance().onKeyDown(event);
    expect(mockItemSelect.mock.calls.length).toBe(0);

    component.setState({
      highlightedIndex: 0,
    });
    component.instance().onKeyDown(event);
    expect(mockItemSelect.mock.calls[0]).toEqual([
      {
        item: mockItems[0],
        event,
      },
    ]);

    component.setState({
      highlightedIndex: 1,
    });
    component.instance().onKeyDown(event);
    expect(mockItemSelect.mock.calls.length).toBe(1);
  });
});
