/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulRadioGroup, RadioGroup, Radio } from '../../radio-v2';

import { FormControl } from '../../form-control';

export function Scenario() {
  const [value, setValue] = React.useState('1');

  return (
    <React.Fragment>
      <FormControl label='Stateful Radio Group'>
        <StatefulRadioGroup
          id='test-id'
          name='stateful'
          initialState={{ value: '2' }}
        >
          <Radio value='1'>First</Radio>
          <Radio
            value='2'
            description='This is a radio description, it gives a little more in-yo-face context about what this is.'
          >
            Second
          </Radio>
          <Radio value='3'>Third</Radio>
        </StatefulRadioGroup>
      </FormControl>

      <FormControl label='Stateless Radio Group'>
        <RadioGroup
          name='stateless'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        >
          <Radio value='1'>First</Radio>
          <Radio
            value='2'
            description='This is a radio description, it gives a little more in-yo-face context about what this is.'
          >
            Second
          </Radio>
          <Radio value='3'>Third</Radio>
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
