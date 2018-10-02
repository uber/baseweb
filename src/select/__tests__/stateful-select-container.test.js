/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {StatefulSelectContainer} from '../index';
import {STATE_CHANGE_TYPE} from '../constants';
import type {StateReducerT} from '../types';

describe('Stateful Select Container', function() {
  let allProps: any, childFn;
  let wrapper;

  beforeEach(function() {
    const stateReducer: StateReducerT = (type, nextState) => nextState;
    childFn = jest.fn(() => <div>test</div>);
    allProps = {
      children: childFn,
      initialState: {},
      stateReducer: stateReducer,
      prop1: 'some other propq',
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should correctly render', function() {
    wrapper = mount(<StatefulSelectContainer {...allProps} />);
    expect(wrapper).toMatchSnapshot('Component has correct render ');
  });

  test('should provide all needed props to children render func', function() {
    wrapper = mount(<StatefulSelectContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject({
      prop1: allProps.prop1,
    });
  });

  test('should provide initial state as part of state', function() {
    allProps.initialState = {prop3: 'some initial state'};
    wrapper = mount(<StatefulSelectContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject(allProps.initialState);
  });

  describe('Events', function() {
    let selectedOptions = [
      {
        id: '123',
        label: 'label for 123',
      },
    ];
    let events, stateReducerMock, instance, event;
    event = {target: {checked: true}};
    const handlers = [
      ['onChange', STATE_CHANGE_TYPE.select, {selectedOptions}],
    ];
    beforeEach(function() {
      events = {
        onChange: jest.fn(),
        onMouseEnter: jest.fn(),
        onMouseLeave: jest.fn(),
        onFocus: jest.fn(),
        onBlur: jest.fn(),
      };
      allProps = {...allProps, ...events};
      stateReducerMock = jest.fn();
      allProps.stateReducer = stateReducerMock;
      wrapper = mount(<StatefulSelectContainer {...allProps} />);
      instance = wrapper.instance();
    });

    test.each(handlers)(
      'should call state reducer to apply new state for %s event with %s type',
      (eventHandler, type, newState) => {
        const handler = instance[eventHandler];
        const params = Object.assign({}, newState, {type});
        handler(event, params);
        expect(stateReducerMock).toHaveBeenCalledWith(
          type,
          newState,
          {},
          event,
          params,
        );
        expect(events[eventHandler]).toHaveBeenCalledWith(event, params);
      },
    );

    test.each([['onMouseEnter'], ['onMouseLeave'], ['onFocus'], ['onBlur']])(
      'should call handler for %s event if it is present',
      eventHandler => {
        const handler = instance[eventHandler];
        handler(event);
        expect(events[eventHandler]).toHaveBeenCalledWith(event);
      },
    );
  });
});
