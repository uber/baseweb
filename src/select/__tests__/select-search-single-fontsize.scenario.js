/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// This scenario tests to make sure that when you overwrite the Input
// with new styles the autosizer logic does not cut off any text.

import * as React from 'react';
import {StatefulSelect} from '../index.js';

export const name = 'select-search-single-fontsize';

export const component = () => <SelectComponent />;

function SelectComponent() {
  return (
    <StatefulSelect
      clearable={false}
      options={[
        {id: 'la', name: 'Los Angeles'},
        {id: 'sf', name: 'San Francisco'},
        {id: 'ny', name: 'New York City'},
      ]}
      initialState={{value: [{id: 'la', name: 'Los Angeles'}]}}
      labelKey="name"
      valueKey="id"
      overrides={{
        Input: {
          style: {
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: '38px',
          },
        },
        SingleValue: {
          style: {
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: '38px',
          },
        },
      }}
    />
  );
}
