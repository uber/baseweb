/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { TimezonePicker } from '..';

const standard = new Date(2019, 2, 1);

const additional = [
  {
    id: 'UTC',
    label: '(GMT +0) UTC',
    offset: 0,
  },
];

const overrides = {
  Select: {
    props: { overrides: { ValueContainer: { props: { 'data-id': 'selected' } } } },
  },
};

export function Scenario() {
  return (
    <div style={{ width: '400px' }}>
      <TimezonePicker date={standard} additionalTimezones={additional} overrides={overrides} />
    </div>
  );
}
