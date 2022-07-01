/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Select } from '../index';
import { Button } from '../../button/index';

export function Scenario() {
  const controlRef = React.useRef(null);
  const [value, setValue] = React.useState([]);

  const options = [
    { id: 'a', label: 'apples' },
    { id: 'b', label: 'bananas' },
    { id: 'c', label: 'dragon fruit' },
  ];

  return (
    <div style={{ width: '360px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Button
          onClick={() => {
            controlRef.current && controlRef.current.setDropdownOpen(true);
          }}
          id={'open'}
        >
          Open Dropdown
        </Button>
        <Button
          onClick={() => {
            controlRef.current && controlRef.current.setDropdownOpen(false);
          }}
          id={'close'}
        >
          Close Dropdown
        </Button>
      </div>
      <Select
        controlRef={controlRef}
        options={options}
        value={value}
        onChange={(params) => setValue(params.value)}
      />
    </div>
  );
}
