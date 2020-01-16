/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulPanelContainer, STATE_CHANGE_TYPE} from '../index.js';

describe('StatefulPanelContainer', () => {
  test('basic render', () => {
    const props = {
      overrides: {
        PanelContainer: function CustomContainer() {
          return <div />;
        },
      },
      initialState: {
        expanded: true,
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn();
    shallow(
      <StatefulPanelContainer {...props}>{children}</StatefulPanelContainer>,
    );
    expect(children).toHaveBeenCalledTimes(1);
  });

  test('children function receives the correct expanded prop value', () => {
    const props = {
      initialState: {
        expanded: true,
      },
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulPanelContainer {...props}>{children}</StatefulPanelContainer>,
    );

    expect(children).toHaveBeenCalledTimes(1);

    const childrenOnClickProp = children.mock.calls[0][0].expanded;
    expect(childrenOnClickProp).toEqual(component.instance().state.expanded);
    expect(childrenOnClickProp).toEqual(props.initialState.expanded);
  });

  test('onChange handler sets state and calls onChange handler from props', () => {
    const props = {
      onChange: jest.fn(),
    };
    const children = jest.fn();
    const component = shallow(
      <StatefulPanelContainer {...props}>{children}</StatefulPanelContainer>,
    );

    expect(component).toHaveState('expanded', false);
    component.instance().onChange({expanded: true});
    expect(component).toHaveState('expanded', true);
    expect(props.onChange).toHaveBeenCalledWith({expanded: true});
  });

  test('stateReducer', () => {
    const props = {
      stateReducer: jest.fn(),
    };
    const children = jest.fn();

    const component = shallow(
      <StatefulPanelContainer {...props}>{children}</StatefulPanelContainer>,
    );

    expect(component).toHaveState('expanded', false);
    props.stateReducer.mockReturnValueOnce({expanded: false});
    component.instance().onChange({expanded: true});

    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenLastCalledWith(
      STATE_CHANGE_TYPE.expand,
      {expanded: true},
      {expanded: false},
    );
    expect(component).toHaveState('expanded', false);
  });
});
