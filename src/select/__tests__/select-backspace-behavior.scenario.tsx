/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Select } from '..';

export function Scenario() {
  const [first, setFirst] = React.useState<any>([]);
  const [second, setSecond] = React.useState<any>([]);

  return (
    <div>
      <div id="backspace-behavior">
        backspace behavior
        <Select
          options={[
            { id: 'AliceBlue', color: '#F0F8FF' },
            { id: 'AntiqueWhite', color: '#FAEBD7' },
            { id: 'Aqua', color: '#00FFFF' },
            { id: 'Aquamarine', color: '#7FFFD4' },
            { id: 'Azure', color: '#F0FFFF' },
            { id: 'Beige', color: '#F5F5DC' },
          ]}
          labelKey="id"
          valueKey="color"
          backspaceRemoves
          onChange={({ value }) => setFirst(value)}
          value={first}
          overrides={{ ClearIcon: { props: { 'data-id': 'clear-icon' } } }}
        />
      </div>

      <div id="backspace-clears-input-value">
        backspace clears input value
        <Select
          options={[
            { id: 'AliceBlue', color: '#F0F8FF' },
            { id: 'AntiqueWhite', color: '#FAEBD7' },
            { id: 'Aqua', color: '#00FFFF' },
            { id: 'Aquamarine', color: '#7FFFD4' },
            { id: 'Azure', color: '#F0FFFF' },
            { id: 'Beige', color: '#F5F5DC' },
          ]}
          labelKey="id"
          valueKey="color"
          backspaceRemoves
          backspaceClearsInputValue
          onChange={({ value }) => setSecond(value)}
          value={second}
          overrides={{ ClearIcon: { props: { 'data-id': 'clear-icon' } } }}
        />
      </div>
    </div>
  );
}
