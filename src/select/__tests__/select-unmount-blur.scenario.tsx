/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Select } from '..';

export function Scenario() {
  const [value, setValue] = React.useState([]);
  const [showSelect, setShowSelect] = React.useState(false);
  return (
    <>
      <p>value selected: {value.length ? [value[0].id] : 'none'}</p>
      {showSelect ? (
        <div data-testid="select-container">
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
            onChange={({ value }) => {
              setValue(value);
              setShowSelect(false);
            }}
            value={value}
            onBlur={() => {
              setShowSelect(false);
            }}
            overrides={{ ValueContainer: { props: { 'data-testid': 'selected' } } }}
          />
        </div>
      ) : (
        <button onClick={() => setShowSelect(true)}>click to show select</button>
      )}
    </>
  );
}
