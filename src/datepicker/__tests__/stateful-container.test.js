/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer, STATE_CHANGE_TYPE} from '../index.js';

describe('StatefulComponentContainer', () => {
  test('basic render', () => {
    const props = {
      initialState: {
        value: new Date(),
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    shallow(<StatefulContainer {...props}>{children}</StatefulContainer>);
    expect(children).toHaveBeenCalledTimes(1);
  });

  describe('Children function receives correct props', () => {
    const props = {
      initialState: {
        value: new Date(2019, 2, 10),
      },
      stateReducer: jest.fn(),
      onChange: jest.fn(),
      onDayMouseOver: jest.fn(),
      onDayMouseLeave: jest.fn(),
    };
    const children = jest.fn();
    const eArgs = {date: new Date(), event: {}};
    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );
    const handlers = [
      ['onDayMouseOver', false],
      ['onDayMouseLeave', false],
      ['onChange', true],
    ];

    test.each(handlers)('Event handlers', (handler, replaced) => {
      // event handler is passed to children function
      const childrenHandler = children.mock.calls[0][0][handler];
      if (replaced) {
        // $FlowFixMe
        expect(childrenHandler).toBe(component.instance()[handler]);
        expect(childrenHandler).not.toBe(props[handler]);
      } else {
        expect(childrenHandler).toBe(props[handler]);
      }
      // event handler from props is called
      childrenHandler(eArgs);
      expect(props[handler]).toHaveBeenCalledTimes(1);
      expect(props[handler]).toHaveBeenLastCalledWith(eArgs);
    });
  });

  test('stateReducer', () => {
    const props = {
      initialState: {
        value: new Date(2016, 2, 10),
      },
      stateReducer: jest.fn(),
    };
    const children = jest.fn();
    const newDate = {date: new Date(2018, 2, 10)};
    const state = {value: newDate.date};
    const stateUpdated = {value: new Date(2019, 2, 10)};

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );
    props.stateReducer.mockReturnValueOnce(stateUpdated);
    component.instance().onChange(newDate);

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer.mock.calls[0][0]).toEqual(
      STATE_CHANGE_TYPE.change,
    );
    expect(props.stateReducer.mock.calls[0][1]).toEqual(state);
    expect(props.stateReducer.mock.calls[0][2]).toMatchObject({
      value: props.initialState.value,
    });
    expect(component).toHaveState('value', stateUpdated.value);
  });
});
