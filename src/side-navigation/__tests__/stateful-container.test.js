/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer, STATE_CHANGE_TYPE} from '../index.js';

test('StatefulContainer - basic render', () => {
  const props = {
    initialState: {activePath: '/'},
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

  // state.activePath passed to children as a prop
  const childrenValueProp = children.mock.calls[0][0].activePath;
  expect(childrenValueProp).toBe(component.instance().state.activePath);
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
  const params = {item: {path: '/123'}};
  childrenOnChangeProp(params);
  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenLastCalledWith(params);
});

test('StatefulContainer - stateReducer', () => {
  const props = {
    stateReducer: jest.fn(),
    initialState: {activePath: '/'},
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  // onChange event happens
  props.stateReducer.mockReturnValueOnce({activePath: '/newpath'});
  component.instance().onChange({item: {path: '/newpath'}});

  expect(props.stateReducer).toHaveBeenCalledTimes(1);
  expect(props.stateReducer).toHaveBeenLastCalledWith(
    STATE_CHANGE_TYPE.change,
    {activePath: '/newpath'},
    {activePath: '/'},
  );
  expect(component).toHaveState('activePath', '/newpath');
});
