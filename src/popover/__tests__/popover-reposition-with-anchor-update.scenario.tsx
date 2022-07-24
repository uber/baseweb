/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Select } from '../../select';

export function Scenario() {
  const [value, setValue] = React.useState<any>([]);
  return (
    <div style={{ width: '200px' }}>
      <Select
        multi
        filterOutSelected={false}
        options={[
          { label: 'Option 1', id: '1' },
          { label: 'Option 2', id: '2' },
          { label: 'Option 3', id: '3' },
        ]}
        value={value}
        placeholder="Select color"
        onChange={(params) => setValue(params.value)}
        closeOnSelect={false}
        startOpen
      />
    </div>
  );
}
