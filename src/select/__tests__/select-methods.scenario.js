/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Select} from '../index.js';
import {Button} from '../../button/index.js';

export default function Scenario() {
  const methodsRef = React.useRef(null);
  const [value, setValue] = React.useState([]);

  const options = [
    {id: 'a', label: 'apples'},
    {id: 'b', label: 'bananas'},
    {id: 'c', label: 'dragon fruit'},
  ];

  return (
    <div style={{width: '360px'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Button
          onClick={() => {
            methodsRef.current && methodsRef.current.setDropdownOpen(true);
          }}
          id={'open'}
        >
          Open Dropdown
        </Button>
        <Button
          onClick={() => {
            methodsRef.current && methodsRef.current.setDropdownOpen(false);
          }}
          id={'close'}
        >
          Close Dropdown
        </Button>
      </div>
      <Select
        methodsRef={methodsRef}
        options={options}
        value={value}
        onChange={params => setValue(params.value)}
      />
    </div>
  );
}
