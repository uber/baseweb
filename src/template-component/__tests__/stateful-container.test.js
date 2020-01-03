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
      overrides: {
        Root: function CustomRoot() {
          return <span />;
        },
      },
      initialState: {
        prop: false,
      },
      onClick: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    shallow(<StatefulContainer {...props}>{children}</StatefulContainer>);

    expect(children).toHaveBeenCalledTimes(1);
  });

  test('children function receives onClick handler', () => {
    const props = {
      onClick: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();
    const event = {};

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    expect(children).toHaveBeenCalledTimes(1);

    // onClick is passed to children function
    const childrenOnClickProp = children.mock.calls[0][0].onClick;
    expect(childrenOnClickProp).toBe(component.instance().onClick);
    expect(childrenOnClickProp).not.toBe(props.onClick);

    // user's onClick handler is called
    childrenOnClickProp(event);
    expect(props.onClick).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenLastCalledWith(event);
  });

  test('stateReducer', () => {
    const props = {
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    props.stateReducer.mockReturnValueOnce({prop: true});
    component.instance().onClick();

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenLastCalledWith(
      STATE_CHANGE_TYPE.click,
      {prop: false},
      {prop: true},
    );
    expect(component).toHaveState('prop', true);
  });

  test('null stateReducer', () => {
    const props = {
      stateReducer: null,
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulContainer {...props}>{children}</StatefulContainer>,
    );

    // null state reducer shouldn't break component
    component.instance().onClick();
    expect(component).toHaveState('prop', false);
  });
});
