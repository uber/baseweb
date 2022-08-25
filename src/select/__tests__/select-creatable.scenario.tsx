/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulSelect } from '..';

export function Scenario() {
  return (
    <StatefulSelect
      creatable
      options={[
        { id: 'Portland', label: 'Portland' },
        { id: 'NYC', label: 'New York City' },
        { id: 'LosAngeles', label: 'Los Angeles' },
        { id: 'Boston', label: 'Boston' },
        { id: 'Atlanta', label: 'Atlanta' },
        { id: 'SanFrancisco', label: 'San Francisco' },
      ]}
      closeOnSelect={false}
      labelKey="label"
      valueKey="id"
      overrides={{ ValueContainer: { props: { 'data-id': 'selected' } } }}
    />
  );
}
