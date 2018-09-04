/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulInput, StyledInput} from '../index';

test('StatefulInput - basic render', () => {
  const props = {
    onChange: jest.fn(),
    label: 'Label',
    caption: 'Caption',
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
