/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {StatefulRadioGroup, Radio} from '../index.js';

describe('radio-group', () => {
  it('sets clicked child checked', () => {
    const wrapper = mount(
      <StatefulRadioGroup>
        <Radio value="1">one</Radio>
        <Radio value="2">two</Radio>
        <Radio value="3">three</Radio>
      </StatefulRadioGroup>,
    );

    const group = wrapper.find('div[role="radiogroup"]');
    const inputs = wrapper.find('input[type="radio"]');

    group.children().forEach((child, index) => {
      expect(child).toHaveProp('checked', false);
    });

    inputs.at(0).simulate('change');
    expect(inputs.at(0).getDOMNode()).toHaveProperty('checked', true);
  });
});
