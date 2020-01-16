/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {StatefulSelectContainer} from '../index.js';
import {STATE_CHANGE_TYPE} from '../constants.js';

describe('StatefulSelectContainer', function() {
  let wrapper;
  let props = {};

  beforeEach(function() {
    props = {
      children: jest.fn(() => <div>test</div>),
      initialState: {value: [{id: 'id', label: 'label'}]},
      stateReducer: jest.fn(),
      overrides: {},
      onChange: jest.fn(),
    };
    wrapper = mount(<StatefulSelectContainer {...props} />);
  });

  afterEach(function() {
    wrapper && wrapper.unmount();
  });

  test('renders correctly', function() {
    expect(wrapper).toMatchSnapshot(
      'StatefulSelectContainer has correct render',
    );
  });

  test('provides props to children render func', function() {
    const actualProps = props.children.mock.calls[0][0];
    expect(actualProps).toMatchObject({
      value: props.initialState.value,
      overrides: props.overrides,
      onChange: wrapper.instance().onChange,
    });
  });

  test('sets initial state correctly', function() {
    expect(wrapper.state()).toMatchObject(props.initialState);
  });

  test('calls stateReducer on every change', function() {
    const newValue = {id: 'id2', label: 'label2'};
    const params = {
      value: [...props.initialState.value, newValue],
      option: newValue,
      type: STATE_CHANGE_TYPE.select,
    };
    const newStateValue = [newValue];
    props.stateReducer.mockImplementation(() => ({
      value: newStateValue,
    }));
    wrapper.instance().onChange(params);
    expect(props.stateReducer).toHaveBeenCalledWith(
      params.type,
      {value: params.value},
      props.initialState,
    );
    expect(wrapper.state().value).toEqual(newStateValue);
  });

  test('calls onChange handler with correct params', function() {
    const newValue = {id: 'id2', label: 'label2'};
    const params = {
      value: [...props.initialState.value, newValue],
      option: newValue,
      type: STATE_CHANGE_TYPE.select,
    };
    props.stateReducer.mockImplementation((type, nextState) => nextState);
    wrapper.instance().onChange(params);
    expect(props.onChange).toHaveBeenCalledWith(params);
    expect(wrapper.state().value).toEqual(params.value);
  });
});
