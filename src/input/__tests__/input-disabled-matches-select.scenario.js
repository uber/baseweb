/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {Input} from '../../input/index.js';
import {Select} from '../../select/index.js';

export default function Scenario() {
  return (
    <div>
      <Select
        value={[{id: 'AliceBlue', color: '#F0F8FF'}]}
        options={[
          {id: 'AliceBlue', color: '#F0F8FF'},
          {id: 'AntiqueWhite', color: '#FAEBD7'},
          {id: 'Aqua', color: '#00FFFF'},
          {id: 'Aquamarine', color: '#7FFFD4'},
          {id: 'Azure', color: '#F0FFFF'},
          {id: 'Beige', color: '#F5F5DC'},
        ]}
        labelKey="id"
        valueKey="color"
        disabled
      />
      <Input
        value="Hello"
        placeholder="Controlled Input"
        clearOnEscape
        disabled
      />
    </div>
  );
}
