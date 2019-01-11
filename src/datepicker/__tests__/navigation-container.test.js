/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {NavigationContainer, STATE_CHANGE_TYPE} from '../index.js';

describe('NavigationContainer', () => {
  test('basic render', () => {
    const props = {
      highlightedDate: new Date(),
      onSelect: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    shallow(<NavigationContainer {...props}>{children}</NavigationContainer>);
    expect(children).toHaveBeenCalledTimes(1);
  });

  describe('Children function receives correct props', () => {
    const props = {
      highlightedDate: new Date(),
      stateReducer: jest.fn(),
      onSelect: jest.fn(),
      onDayMouseOver: jest.fn(),
      onDayMouseLeave: jest.fn(),
    };
    const children = jest.fn();
    const eArgs = {date: new Date(), event: {}};
    const component = shallow(
      <NavigationContainer {...props}>{children}</NavigationContainer>,
    );
    const handlers = [
      ['onDayMouseOver', true],
      ['onDayMouseLeave', true],
      ['onSelect', true],
    ];

    test.each(handlers)('Event handlers', (handler, replaced) => {
      // event handler is passed to children function
      const childrenHandler = children.mock.calls[0][0][handler];
      if (replaced) {
        expect(childrenHandler).toBe(component.instance()[handler]);
        expect(childrenHandler).not.toBe(props[handler]);
      } else {
        expect(childrenHandler).toBe(props[handler]);
      }
      // event handler from props is called
      // $FlowFixMe
      childrenHandler(eArgs);
      expect(props[handler]).toHaveBeenCalledTimes(1);
      expect(props[handler]).toHaveBeenLastCalledWith(eArgs);
    });
  });

  test('stateReducer', () => {
    const props = {
      highlightedDate: new Date(2010, 6, 8),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();
    const state = {highlightedDate: new Date(2010, 6, 8)};
    const stateUpdated = {highlightedDate: new Date(2010, 6, 1)};

    const component = shallow(
      <NavigationContainer {...props}>{children}</NavigationContainer>,
    );
    props.stateReducer.mockReturnValueOnce(state);
    component.instance().onKeyDown({
      key: 'ArrowUp',
      preventDefault: () => {},
      stopPropagation: () => {},
    });

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer.mock.calls[0][0]).toEqual(
      STATE_CHANGE_TYPE.moveUp,
    );
    expect(props.stateReducer.mock.calls[0][1]).toEqual(stateUpdated);
    expect(props.stateReducer.mock.calls[0][2]).toMatchObject(state);
    expect(component).toHaveState('highlightedDate', state.highlightedDate);
  });
});
