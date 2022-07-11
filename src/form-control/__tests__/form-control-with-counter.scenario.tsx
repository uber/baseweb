/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FormControl } from '../index';
import { Input, StatefulInput, SIZE } from '../../input/index';
import { Textarea } from '../../textarea/index';

export function Scenario() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <FormControl label="Enable counter" caption="Input caption" counter>
        <Input size={SIZE.compact} value={value} onChange={(e) => setValue(e.target.value)} />
      </FormControl>
      <FormControl label="Counter with max value" caption="Input caption" counter>
        <Input
          size={SIZE.compact}
          value={value}
          maxLength={40}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
      <FormControl label="Counter with textarea" caption="Input caption" counter>
        <Textarea value={value} maxLength={40} onChange={(e) => setValue(e.target.value)} />
      </FormControl>
      <FormControl label="Disable counter" caption="Input caption" counter={false}>
        <Input size={SIZE.compact} value={value} onChange={(e) => setValue(e.target.value)} />
      </FormControl>
      <FormControl
        label="Override counter"
        caption="Input caption"
        counter={{ length: value.length }}
      >
        <StatefulInput
          size={SIZE.compact}
          maxLength={50}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
      <FormControl
        label="Override counter with max length"
        caption="Input caption"
        counter={{ length: value.length, maxLength: 100 }}
      >
        <StatefulInput
          size={SIZE.compact}
          maxLength={50}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
    </div>
  );
}
