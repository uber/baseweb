/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';

import {RadioGroup, Radio} from '../index.js';

describe('radio-group', () => {
  it('sets expected child radio checked', () => {
    const wrapper = shallow(
      <RadioGroup value="3">
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" />
      </RadioGroup>,
    );

    wrapper.children().forEach((child, index) => {
      expect(child).toHaveProp('checked', index === 2);
    });
  });

  it('disables children if disabled', () => {
    const wrapper = shallow(
      <RadioGroup disabled>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );

    wrapper.children().forEach(child => {
      expect(child).toHaveProp('disabled', true);
    });
  });

  it('disabled prop on children take priority', () => {
    const wrapper = shallow(
      <RadioGroup disabled={false}>
        <Radio disabled />
        <Radio />
        <Radio />
      </RadioGroup>,
    );

    wrapper.children().forEach((child, index) => {
      expect(child).toHaveProp('disabled', index === 0);
    });
  });
});
