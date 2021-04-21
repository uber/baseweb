/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulMenu} from '../index.js';

const ITEMS = [
  {label: 'Item One'},
  {label: 'Item Two'},
  {disabled: true, label: 'Item Three'},
  {label: 'Item Four'},
  {label: 'Item Five'},
  {label: 'Item Six'},
  {label: 'Item Seven'},
  {label: 'Item Eight'},
  {label: 'Item Nine'},
  {label: 'Item Ten'},
  {label: 'Item Eleven'},
  {label: 'Item Twelve'},
];

export default function Scenario() {
  return (
    <StatefulMenu
      initialState={{
        highlightedIndex: 5,
      }}
      items={ITEMS}
      overrides={{
        List: {
          style: {
            height: '300px',
            width: '350px',
          },
        },
        Option: {
          props: {
            getItemLabel: item => item.label,
          },
        },
      }}
    />
  );
}
