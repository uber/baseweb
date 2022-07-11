/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDatepicker } from '../index';
import { addDays } from '../utils/index';

const now = new Date('2019-02-14T10:00:00Z');

export function Scenario() {
  return (
    <StatefulDatepicker
      range
      initialState={{
        value: [now, addDays(now, 3)],
      }}
      quickSelect
    />
  );
}
