/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import StatefulContainer from '../stateful-container.js';
import {STATE_CHANGE_TYPE} from '../constants.js';

test('StatefulContainer - basic render', () => {
  const props = {
    initialState: {activeItemId: '/'},
    onChange: jest.fn(),
    stateReducer: jest.fn(),
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  expect(children).toHaveBeenCalledTimes(1);
  expect(children.mock.calls[0]).toMatchSnapshot(
    'function-as-child called with correct args',
  );

  // state.activeItemId passed to children as a prop
  const childrenValueProp = children.mock.calls[0][0].activeItemId;
  expect(childrenValueProp).toBe(component.instance().state.activeItemId);
});

test('StatefulContainer - children function receives onChange handler', () => {
  const props = {
    onChange: jest.fn(),
    stateReducer: jest.fn(),
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );
  expect(children).toHaveBeenCalledTimes(1);

  // onChange is passed to children function
  const childrenOnChangeProp = children.mock.calls[0][0].onChange;
  expect(childrenOnChangeProp).toBe(component.instance().onChange);
  expect(childrenOnChangeProp).not.toBe(props.onChange);

  // user's onChange handler is called
  const params = {item: {itemId: '/123'}, event: jest.fn()};
  // $FlowFixMe
  childrenOnChangeProp && childrenOnChangeProp(params);
  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenLastCalledWith(params);
});

test('StatefulContainer - stateReducer', () => {
  const props = {
    stateReducer: jest.fn(),
    initialState: {activeItemId: '/'},
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  // onChange event happens
  props.stateReducer.mockReturnValueOnce({activeItemId: '/newpath'});
  // $FlowFixMe
  component.instance().onChange({item: {itemId: '/newpath'}});

  expect(props.stateReducer).toHaveBeenCalledTimes(1);
  expect(props.stateReducer).toHaveBeenLastCalledWith(
    STATE_CHANGE_TYPE.change,
    {activeItemId: '/newpath'},
    {activeItemId: '/'},
  );
  expect(component).toHaveState('activeItemId', '/newpath');
});
