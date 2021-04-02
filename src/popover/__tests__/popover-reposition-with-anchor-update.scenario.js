/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Select} from '../../select/index.js';

export default function Scenario() {
  const [value, setValue] = React.useState([]);
  return (
    <div style={{width: '200px'}}>
      <Select
        multi
        filterOutSelected={false}
        options={[
          {label: 'Option 1', id: '1'},
          {label: 'Option 2', id: '2'},
          {label: 'Option 3', id: '3'},
        ]}
        value={value}
        placeholder="Select color"
        onChange={params => setValue(params.value)}
        closeOnSelect={false}
        startOpen
      />
    </div>
  );
}
