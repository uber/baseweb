/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Select } from '../index';

export function Scenario() {
  const inputRef = React.useRef(null);
  const [selectValue, setSelectValue] = React.useState<any>([]);

  const options = [
    { id: 'a', label: 'apples' },
    { id: 'b', label: 'bananas' },
    { id: 'c', label: 'dragon fruit' },
  ];

  return (
    <div style={{ width: '360px' }}>
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        focus
      </button>
      <Select
        inputRef={inputRef}
        options={options}
        value={selectValue}
        onChange={(params) => setSelectValue(params.value)}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
      />
    </div>
  );
}
