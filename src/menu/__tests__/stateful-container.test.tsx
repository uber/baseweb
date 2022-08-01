/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env browser */
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import StatefulContainer from '../stateful-container';
import { KEY_STRINGS } from '../constants';

const mockItems = [{ label: 'item1' }, { disabled: true, label: 'item2' }];
const mockChildrenFn = jest.fn().mockImplementation(() => <div />);
const mockItemSelect = jest.fn();

const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;

function getSharedProps() {
  return {
    items: mockItems,
    onItemSelect: mockItemSelect,
    children: mockChildrenFn,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stateReducer: jest.fn().mockImplementation((changeType, changes) => changes as any),
  };
}

describe('Menu StatefulContainer', () => {
  beforeAll(() => {
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    document.addEventListener = originalAddEventListener;
    document.removeEventListener = originalRemoveEventListener;
  });

  it('renders and passes required props to children function', () => {
    const props = {
      items: mockItems,
      onItemSelect: mockItemSelect,
      children: mockChildrenFn,
    };
    render(<StatefulContainer {...props} />);

    const result = mockChildrenFn.mock.calls[0][0];
    expect(result).toHaveProperty('highlightedIndex', -1);
    expect(result).toHaveProperty('items', mockItems);
    expect(result).toHaveProperty('rootRef');
    expect(result).toHaveProperty('getRequiredItemProps');
    expect(result).toHaveProperty('focusMenu');
    expect(result).toHaveProperty('unfocusMenu');
    expect(result).toHaveProperty('isFocused', false);
  });

  it('with initialState', () => {
    const props = {
      ...getSharedProps(),
      initialState: {
        isFocused: false,
        highlightedIndex: 5,
      },
    };
    render(<StatefulContainer {...props} />);
    const result = mockChildrenFn.mock.calls[0][0];
    expect(result).toHaveProperty('highlightedIndex', 5);
    expect(result).toHaveProperty('isFocused', false);
  });

  it('getRequiredItemProps returns correct props', () => {
    render(<StatefulContainer {...getSharedProps()} />);
    const item = mockItems[0];
    const result = mockChildrenFn.mock.calls[0][0];
    const props = result.getRequiredItemProps(item, 0);

    expect(props).toHaveProperty('disabled', false);
    expect(props).toHaveProperty('isFocused', false);
    expect(props).toHaveProperty('isHighlighted', false);
    expect(props).toHaveProperty('onClick');
    expect(props).toHaveProperty('onMouseEnter');
    expect(props).toHaveProperty('ref');
    expect(props).toHaveProperty('resetMenu');

    const event = { preventDefault: jest.fn() };
    act(() => props.onClick(event));
    expect(mockItemSelect.mock.calls[0][0]).toEqual({
      item,
      event,
    });
  });

  it('getRequiredItemProps returns correct props for disabled item', () => {
    render(<StatefulContainer {...getSharedProps()} />);
    const item = mockItems[1];
    const result = mockChildrenFn.mock.calls[0][0];
    const props = result.getRequiredItemProps(item, 1);

    expect(props).toHaveProperty('disabled', true);
    expect(props).toHaveProperty('isFocused', false);
    expect(props).toHaveProperty('isHighlighted', false);
    expect(props).not.toHaveProperty('onClick');
    expect(props).not.toHaveProperty('onMouseEnter');
    expect(props).toHaveProperty('ref');
    expect(props).toHaveProperty('resetMenu');
  });

  it('getRequiredItemProps does not return onClick and onMouseEnter props for item set to disabled through getRequiredItemProps', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRequiredItemProps = jest.fn().mockImplementation((item) => ({ disabled: true }));
    render(<StatefulContainer {...getSharedProps()} getRequiredItemProps={getRequiredItemProps} />);
    const item = mockItems[0];
    const result = mockChildrenFn.mock.calls[0][0];
    const props = result.getRequiredItemProps(item, 0);

    expect(props).not.toHaveProperty('onClick');
    expect(props).not.toHaveProperty('onMouseEnter');
  });

  it('disabled prop value returned from getRequiredItemProps takes precedence over the one defined on item', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRequiredItemProps = jest.fn().mockImplementation((item) => ({ disabled: false }));
    render(<StatefulContainer {...getSharedProps()} getRequiredItemProps={getRequiredItemProps} />);
    const item = mockItems[1];
    const result = mockChildrenFn.mock.calls[0][0];
    const props = result.getRequiredItemProps(item, 1);

    expect(props).toHaveProperty('onClick');
    expect(props).toHaveProperty('onMouseEnter');
  });

  it('getRequiredItemProps returns correct props for active child', () => {
    render(<StatefulContainer {...getSharedProps()} initialState={{ highlightedIndex: 0 }} />);
    const item = mockItems[0];
    const result = mockChildrenFn.mock.calls[0][0];
    const props = result.getRequiredItemProps(item, 0);

    expect(props).toHaveProperty('disabled', false);
    expect(props).toHaveProperty('isFocused', false);
    expect(props).toHaveProperty('isHighlighted', true);
    expect(props).toHaveProperty('onClick');
    expect(props).toHaveProperty('onMouseEnter');
    expect(props).toHaveProperty('ref');
    expect(props).toHaveProperty('resetMenu');
  });

  it('onKeyDown - handleArrowKey', () => {
    const props = getSharedProps();
    render(<StatefulContainer {...props} />);

    act(() => {
      mockChildrenFn.mock.calls[0][0].handleKeyDown({
        key: KEY_STRINGS.ArrowUp,
        preventDefault: jest.fn(),
      });
    });
    expect(mockChildrenFn.mock.calls[1][0].highlightedIndex).toBe(0);

    act(() => {
      mockChildrenFn.mock.calls[0][0].handleKeyDown({
        key: KEY_STRINGS.ArrowDown,
        preventDefault: jest.fn(),
      });
    });
    expect(mockChildrenFn.mock.calls[2][0].highlightedIndex).toBe(1);
  });

  it('onKeyDown - handleEnterKey', () => {
    const props = getSharedProps();
    render(<StatefulContainer {...props} />);

    act(() => {
      mockChildrenFn.mock.calls[0][0].handleKeyDown({
        key: KEY_STRINGS.Enter,
        preventDefault: jest.fn(),
      });
    });
    expect(mockItemSelect.mock.calls.length).toBe(0);

    act(() => {
      mockChildrenFn.mock.calls[0][0].handleKeyDown({
        key: KEY_STRINGS.ArrowDown,
        preventDefault: jest.fn(),
      });
    });

    act(() => {
      mockChildrenFn.mock.calls[1][0].handleKeyDown({
        key: KEY_STRINGS.Enter,
        preventDefault: jest.fn(),
      });
    });
    expect(mockItemSelect.mock.calls.length).toBe(1);
  });

  it('onKeyDown - type-ahead', () => {
    const sharedProps = getSharedProps();
    const props = {
      ...sharedProps,
      items: [{ label: 'item1' }, { label: 'aardvark' }],
    };
    render(<StatefulContainer {...props} typeAhead />);
    expect(mockChildrenFn.mock.calls[0][0]).toHaveProperty('highlightedIndex', -1);

    act(() => {
      mockChildrenFn.mock.calls[0][0].handleKeyDown({
        key: 'a',
        preventDefault: jest.fn(),
      });
    });
    expect(mockItemSelect.mock.calls.length).toBe(0);

    act(() => {
      mockChildrenFn.mock.calls[1][0].handleKeyDown({
        key: KEY_STRINGS.Enter,
        preventDefault: jest.fn(),
      });
    });
    const result = mockChildrenFn.mock.calls[1][0];
    expect(mockItemSelect.mock.calls.length).toBe(1);
    expect(result).toHaveProperty('highlightedIndex', 1);
  });

  it('onKeyDown - type-ahead doesnt throw when label is a component', () => {
    const sharedProps = getSharedProps();
    const props = {
      ...sharedProps,
      items: [{ label: <span>item1</span> }, { label: 'aardvark' }],
    };
    render(<StatefulContainer {...props} typeAhead />);

    expect(() =>
      act(() => {
        mockChildrenFn.mock.calls[0][0].handleKeyDown({
          key: 'z',
          preventDefault: jest.fn(),
        });
      })
    ).not.toThrow();
  });
});
