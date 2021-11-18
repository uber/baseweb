/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulCheckbox} from '../index.js';

import {FormControl} from '../../form-control/index.js';
import {Select} from '../../select/index.js';

export function Scenario() {
  return (
    <FormControl label="Test-label">
      <StatefulCheckbox containsInteractiveElement>
        <Select placeholder="Select color" />
      </StatefulCheckbox>
    </FormControl>
  );
}
