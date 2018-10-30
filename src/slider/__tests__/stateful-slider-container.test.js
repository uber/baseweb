/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {StatefulContainer as StatefulSliderContainer} from '../index';
import {STATE_CHANGE_TYPE} from '../constants';
import type {StateReducerT} from '../types';

describe('Stateful Slider Container', function() {
  let allProps: any, childFn;
  let wrapper;

  beforeEach(function() {
    const stateReducer: StateReducerT = (type, nextState) => nextState;
    childFn = jest.fn(() => <div>test</div>);
    allProps = {
      children: childFn,
      initialState: {},
      stateReducer: stateReducer,
      prop1: 'some other slider propq',
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should correctly render', function() {
    wrapper = mount(<StatefulSliderContainer {...allProps} />);
    expect(wrapper).toMatchSnapshot('Component has correct render ');
  });

  test('should provide all needed props to children render func', function() {
    wrapper = mount(<StatefulSliderContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject({
      prop1: allProps.prop1,
    });
  });

  test('should provide initial state as part of state', function() {
    allProps.initialState = {value: [30, 80]};
    wrapper = mount(<StatefulSliderContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject(allProps.initialState);
  });

  describe('Events', function() {
    let value = [40];
    let events, stateReducerMock, instance, event;
    event = {target: {}};
    const handlers = [['onChange', STATE_CHANGE_TYPE.change, {value}]];
    beforeEach(function() {
      events = {
        onChange: jest.fn(),
      };
      allProps = {...allProps, ...events};
      stateReducerMock = jest.fn();
      allProps.stateReducer = stateReducerMock;
      wrapper = mount(<StatefulSliderContainer {...allProps} />);
      instance = wrapper.instance();
    });

    test.each(handlers)(
      'should call state reducer to apply new state for %s event with %s type',
      (eventHandler, type, newState) => {
        const handler = instance[eventHandler];
        const params = {...newState};
        handler({event, ...params});
        expect(stateReducerMock).toHaveBeenCalledWith(
          type,
          newState,
          {},
          event,
        );
        expect(events[eventHandler]).toHaveBeenCalledWith({event, ...params});
      },
    );
  });
});
