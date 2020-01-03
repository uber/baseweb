/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer as StatefulSliderContainer} from '../index.js';
import {STATE_CHANGE_TYPE} from '../constants.js';
import type {StateReducerT} from '../types.js';

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
      prop1: 'some other slider prop',
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
  });

  test('should correctly render', function() {
    wrapper = shallow(<StatefulSliderContainer {...allProps} />);
    expect(wrapper).toMatchSnapshot('Component has correct render ');
  });

  test('should provide all needed props to children renders func', function() {
    wrapper = shallow(<StatefulSliderContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject({
      prop1: allProps.prop1,
    });
  });

  test('should provide initial state as part of state', function() {
    allProps.initialState = {value: [30, 80]};
    wrapper = shallow(<StatefulSliderContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject(allProps.initialState);
  });

  test('stateReducer', () => {
    allProps.initialState = {value: [50, 80]};
    allProps.stateReducer = jest.fn();
    const component = shallow(<StatefulSliderContainer {...allProps} />);
    allProps.stateReducer.mockReturnValueOnce({value: [60, 80]});
    component.instance().onChange({value: [60, 80]});
    expect(allProps.stateReducer).toHaveBeenCalledTimes(1);
    expect(allProps.stateReducer).toHaveBeenLastCalledWith(
      STATE_CHANGE_TYPE.change,
      {value: [60, 80]},
      {value: [50, 80]},
    );
    expect(component).toHaveState('value', [60, 80]);
  });
});
