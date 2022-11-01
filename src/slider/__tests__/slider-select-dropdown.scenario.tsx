/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Slider } from '..';
import { Select } from '../../select';
import type { Value } from '../../select';

export function Scenario() {
  const [value, setValue] = React.useState([25, 75]);
  const [selectValue, setSelectValue] = React.useState<Value>([]);

  return (
    <>
      <Select
        options={[
          { label: 'AliceBlue', id: '#F0F8FF' },
          { label: 'AntiqueWhite', id: '#FAEBD7' },
          { label: 'Aqua', id: '#00FFFF' },
          { label: 'Aquamarine', id: '#7FFFD4' },
          { label: 'Azure', id: '#F0FFFF' },
          { label: 'Beige', id: '#F5F5DC' },
        ]}
        value={selectValue}
        placeholder="Select color"
        onChange={(params) => setSelectValue(params.value)}
        startOpen
      />
      <Slider value={value} onChange={({ value }) => value && setValue(value)} />
    </>
  );
}
