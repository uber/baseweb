/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Menu } from '..';

const ITEMS = [
  { label: 'Menu option A' },
  { label: 'Menu option B' },
  { divider: true },
  { label: 'Menu option X' },
  { label: 'Menu option Y' },
  { label: 'Menu option Z' },
  { divider: true },
  { label: 'Menu option 1' },
  { label: 'Menu option 2' },
  { label: 'Menu option 3' },
];

export function Scenario() {
  return (
    <Menu
      items={ITEMS}
      rootRef={React.createRef()}
      overrides={{
        List: {
          style: {
            width: '200px',
          },
        },
        Option: {
          props: {
            getItemLabel: (item) => item.label,
          },
        },
      }}
    />
  );
}
