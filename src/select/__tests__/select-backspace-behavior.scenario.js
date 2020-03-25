/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Select} from '../index.js';

export default function Scenario() {
  const [value, setValue] = React.useState([]);
  return (
    <div>
      <div id="backspace-behavior">
        backspace behavior
        <Select
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
          backspaceRemoves={true}
          onChange={({value}) => setValue(value)}
          value={value}
          overrides={{ClearIcon: {props: {'data-id': 'clear-icon'}}}}
        />
      </div>
    </div>
  );
}
