/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { AppNavBar, setItemActive } from '../index.js';

export function Scenario() {
  const [mainItems, setMainItems] = React.useState([
    { label: 'label', info: { id: 1 } },
    { label: 'label', info: { id: 2 } },
    { label: 'label', info: { id: 3 } },
    { label: 'label', info: { id: 4 } },
  ]);

  function getUniqueIdentifier(item) {
    if (item.info) {
      return item.info.id;
    }
    return item.label;
  }

  function handleMainItemSelect(item) {
    setMainItems((prev) => setItemActive(prev, item, getUniqueIdentifier));
  }

  return (
    <AppNavBar
      title="get unique identifier"
      mainItems={mainItems}
      onMainItemSelect={handleMainItemSelect}
    />
  );
}
