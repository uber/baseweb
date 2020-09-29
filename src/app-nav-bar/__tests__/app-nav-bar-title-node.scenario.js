/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledLink} from '../../link/index.js';
import ChevronDown from '../../icon/chevron-down.js';
import Delete from '../../icon/delete.js';
import Upload from '../../icon/upload.js';
import Overflow from '../../icon/overflow.js';
import {useStyletron} from '../../styles/index.js';

import {AppNavBar, setItemActive, POSITION} from '../index.js';

export default function Scenario() {
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
