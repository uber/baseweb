/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Option, Select } from '..';

const COLORS: Option[] = [
  { label: 'AliceBlue', id: '#F0F8FF' },
  { label: 'AntiqueWhite', id: '#FAEBD7' },
  { label: 'Aqua', id: '#00FFFF' },
  { label: 'Aquamarine', id: '#7FFFD4' },
  { label: 'Azure', id: '#F0FFFF' },
  { label: 'Beige', id: '#F5F5DC' },
];

export function Scenario() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = React.useState<any>([]);
  const [searchResults, setSearchResults] = React.useState([]);
  return (
    <Select
      options={searchResults}
      onChange={({ value }) => setValue(value)}
      value={value}
      onInputChange={({ target: { value } }) => {
        setSearchResults([]);
        setTimeout(() => {
          setSearchResults(
            COLORS.filter(
              (color) => (color.label as string).toLowerCase().indexOf(value.toLowerCase()) > -1
            )
          );
        });
      }}
    />
  );
}
