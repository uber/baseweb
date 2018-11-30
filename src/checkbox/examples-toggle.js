/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
/* eslint-disable react/display-name*/

import * as React from 'react';
import {StatefulCheckbox as Checkbox, STYLE_TYPE} from './index.js';

const onChange = e => {
  // eslint-disable-next-line no-console
  console.log('Checked:', e.target.checked);
};

export const suite = 'Checkbox Test Suite';
export const tests = {
  SIMPLE_TOGGLE_EXAMPLE: 'Checkbox as toggle example',
  TOGGLE_DISABLED_EXAMPLE: 'Checkbox as disabled toggle example',
};

export default {
  [tests.SIMPLE_TOGGLE_EXAMPLE]: () => {
    return (
      <div style={{width: '400px'}}>
        <Checkbox onChange={onChange} checkmarkType={STYLE_TYPE.toggle}>
          click this toggle
        </Checkbox>
      </div>
    );
  },
  [tests.TOGGLE_DISABLED_EXAMPLE]: () => {
    return (
      <div style={{width: '400px'}}>
        <Checkbox
          onChange={onChange}
          disabled
          checkmarkType={STYLE_TYPE.toggle}
        >
          this toggle is disabled
        </Checkbox>
      </div>
    );
  },
};
