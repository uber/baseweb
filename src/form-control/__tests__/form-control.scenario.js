/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {FormControl} from '../index.js';
import {StatefulCheckbox} from '../../checkbox/index.js';
import {StatefulInput, SIZE} from '../../input/index.js';
import {StatefulRadioGroup, Radio} from '../../radio/index.js';
import {StatefulTextarea} from '../../textarea/index.js';

export const name = 'form-control';

export const component = () => (
  <div>
    <FormControl label="Input label" caption="Input caption">
      <StatefulInput size={SIZE.compact} />
    </FormControl>
    <FormControl label="Textarea label" caption="Textarea caption">
      <StatefulTextarea size={SIZE.compact} />
    </FormControl>
    <FormControl label="Checkbox label" caption="Checkbox caption">
      <StatefulCheckbox>Checkbox control</StatefulCheckbox>
    </FormControl>
    <FormControl label="RadioGroup label" caption="RadioGroup caption">
      <StatefulRadioGroup>
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
        <Radio value="blue">Blue</Radio>
      </StatefulRadioGroup>
    </FormControl>
  </div>
);
