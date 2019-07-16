/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {Input, StyledInputContainer} from '../index.js';

test('Input - renders enhancers', () => {
  const props = {
    onChange: jest.fn(),
    startEnhancer: 'pre',
    endEnhancer: 'post',
  };

  const wrapper = mount(<Input {...props} />);
  expect(wrapper).toHaveState('isFocused', false);

  // Renders input and enhancers
  const renderedInput = wrapper.find(StyledInputContainer).first();
  expect(renderedInput).toExist();
  expect(renderedInput.props()).toMatchSnapshot(
    'input has correct props when enhancers added',
  );

  wrapper.setProps({startEnhancer: 'pre', endEnhancer: null});
  const renderedInput2 = wrapper.find(StyledInputContainer).first();
  expect(renderedInput2).toExist();
  expect(renderedInput2.props()).toMatchSnapshot(
    'input has correct props when start enhancers added',
  );
  wrapper.setProps({startEnhancer: null, endEnhancer: 'post'});
  const renderedInput3 = wrapper.find(StyledInputContainer).first();
  expect(renderedInput3).toExist();
  expect(renderedInput3.props()).toMatchSnapshot(
    'input has correct props when end enhancers added',
  );
});
