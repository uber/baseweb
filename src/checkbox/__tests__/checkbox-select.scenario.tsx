/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulCheckbox } from '..';

import { FormControl } from '../../form-control';
import { Select } from '../../select';

export function Scenario() {
  return (
    <FormControl label="Test-label">
      <StatefulCheckbox containsInteractiveElement>
        <Select placeholder="Select color" />
      </StatefulCheckbox>
    </FormControl>
  );
}
