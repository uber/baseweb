/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Select } from '../index';

export function Scenario() {
  const [showSelect, setShowSelect] = React.useState(false);
  const [value, setValue] = React.useState([]);

  const handleClick = () => {
    setShowSelect(true);
  };

  const handleBlur = () => {
    setShowSelect(false);
  };

  return (
    <>
      <button data-test-id="button" onClick={handleClick}>
        Show Select
      </button>
      {showSelect && (
        <Select
          autoFocus
          onBlur={handleBlur}
          options={[
            { label: 'AliceBlue', id: '#F0F8FF' },
            { label: 'AntiqueWhite', id: '#FAEBD7' },
            { label: 'Aqua', id: '#00FFFF' },
            { label: 'Aquamarine', id: '#7FFFD4' },
            { label: 'Azure', id: '#F0FFFF' },
            { label: 'Beige', id: '#F5F5DC' },
          ]}
          value={value}
          placeholder="Select color"
          onChange={(params) => setValue(params.value)}
        />
      )}
    </>
  );
}
