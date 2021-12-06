/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import {AppNavBar, setItemActive} from '../index.js';

export function Scenario() {
  const [css] = useStyletron();

  const [mainItems, setMainItems] = React.useState([{label: 'label'}]);

  function handleMainItemSelect(item) {
    setMainItems(prev => setItemActive(prev, item));
  }

  return (
    <AppNavBar
      title={<div className={css({color: 'green'})}>title node</div>}
      mainItems={mainItems}
      onMainItemSelect={handleMainItemSelect}
    />
  );
}
