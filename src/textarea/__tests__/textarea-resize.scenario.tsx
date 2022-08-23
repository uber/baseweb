/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulTextarea } from '..';

export function Scenario() {
  return (
    <StatefulTextarea
      placeholder="Uncontrolled textarea"
      initialState={{ value: 'initial value' }}
      resize="both"
    />
  );
}
