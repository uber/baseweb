/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulSelect} from '../index.js';
import {Button} from '../../button/index.js';

export default function Scenario() {
  const methodsRef = React.useRef();

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
        >
          Open Dropdown
        </Button>
        <Button
          onClick={() => {
            methodsRef.current && methodsRef.current.setDropdownOpen(false);
          }}
        >
          Close Dropdown
        </Button>
      </div>
      <StatefulSelect
        methodsRef={methodsRef}
        options={[
          {id: 'a', label: 'hey!'},
          {id: 'b', label: 'are you listening?'},
          {id: 'c', label: 'look at me!'},
        ]}
      />
    </div>
  );
}
