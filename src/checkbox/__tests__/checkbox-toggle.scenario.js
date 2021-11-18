/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulCheckbox, STYLE_TYPE} from '../index.js';

export function Scenario() {
  return (
    <div style={{width: '200px'}}>
      <StatefulCheckbox checkmarkType={STYLE_TYPE.toggle}>
        click me
      </StatefulCheckbox>
    </div>
  );
}
