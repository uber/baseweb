/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent, getByRole} from '@testing-library/react';

import {StatefulRadioGroup, Radio} from '../index.js';

describe('radio-group', () => {
  it('sets clicked child checked', () => {
    const {container} = render(
      <StatefulRadioGroup>
        <Radio value="1">one</Radio>
        <Radio value="2">two</Radio>
        <Radio value="3">three</Radio>
      </StatefulRadioGroup>,
    );

    getByRole(container, 'radiogroup');

    const inputs = container.querySelectorAll('input');
    for (let input of inputs) {
      expect(input).toHaveProperty('checked', false);
    }

    fireEvent.click(inputs[0]);
    expect(inputs[0]).toHaveProperty('checked', true);
  });
});
