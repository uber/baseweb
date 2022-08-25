/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { StatefulPinCode } from '..';

export function Scenario() {
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <div>
      <StatefulPinCode values={values} onChange={({ values }) => setValues(values)} mask="*" />

      <p data-testid="pinCodeValue">password:{values.join(' ')} </p>
    </div>
  );
}
