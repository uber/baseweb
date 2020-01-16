/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Select} from '../index.js';

export const name = 'select-async-options';

const COLORS = [
  {label: 'AliceBlue', id: '#F0F8FF'},
  {label: 'AntiqueWhite', id: '#FAEBD7'},
  {label: 'Aqua', id: '#00FFFF'},
  {label: 'Aquamarine', id: '#7FFFD4'},
  {label: 'Azure', id: '#F0FFFF'},
  {label: 'Beige', id: '#F5F5DC'},
];

export const component = () => {
  const [value, setValue] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  return (
    <Select
      options={searchResults}
      onChange={({value}) => setValue(value)}
      value={value}
      onInputChange={({target: {value}}) => {
        setSearchResults([]);
        setTimeout(() => {
          setSearchResults(
            COLORS.filter(
              color =>
                color.label.toLowerCase().indexOf(value.toLowerCase()) > -1,
            ),
          );
        });
      }}
    />
  );
};
