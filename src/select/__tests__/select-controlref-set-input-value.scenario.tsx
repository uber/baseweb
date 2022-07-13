/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Select } from '../index';
import { Button, SHAPE } from '../../button/index';
import { Input } from '../../input/index';

export function Scenario() {
  const controlRef = React.useRef(null);
  const [selectValue, setSelectValue] = React.useState<any>([]);
  const [inputValue, setInputValue] = React.useState('apples');

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
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id={'inputValue'}
        />
        <div style={{ minWidth: '105px', marginLeft: '20px' }}>
          <Button
            onClick={(e) => controlRef.current && controlRef.current.setInputValue(inputValue)}
            id={'setInputValueBtn'}
            shape={SHAPE.pill}
          >
            Set value
          </Button>
        </div>
      </div>
      <Select
        controlRef={controlRef}
        options={options}
        value={selectValue}
        onChange={(params) => setSelectValue(params.value)}
        overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
      />
    </div>
  );
}
