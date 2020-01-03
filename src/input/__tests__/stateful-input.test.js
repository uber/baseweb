/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow, mount} from 'enzyme';
import {StatefulInput, StyledInput, StatefulContainer} from '../index.js';

describe('', () => {
  test('basic render', () => {
    const props = {
      onChange: jest.fn(),
      overrides: {
        Input: function CustomInput(props) {
          return (
            <span>
              <StyledInput {...props} />
            </span>
          );
        },
      },
    };
    const component = shallow(<StatefulInput {...props} />);
    expect(component).toMatchSnapshot('renders <StatefulContainer/>');
    expect(component.dive()).toMatchSnapshot('renders <Input/> as a child');
  });

  test('onChange handling and state updates', () => {
    const props = {
      onChange: jest.fn(),
      stateReducer: jest
        .fn()
        .mockImplementation((type, nextState) => nextState),
    };
    const newValue = 'new value';
    const event = {target: {value: newValue}};
    const component = mount(<StatefulInput {...props} />);
    const renderedStatefulContainer = component.find(StatefulContainer).first();
    const statefulContainerInstance = renderedStatefulContainer.instance();
    expect(statefulContainerInstance.state.value).toEqual('');
    // $FlowFixMe
    statefulContainerInstance.onChange(event);
    expect(props.stateReducer).toHaveBeenCalledWith(
      'change',
      {value: newValue},
      {value: ''},
    );
    expect(statefulContainerInstance.state.value).toEqual(newValue);
  });
});
