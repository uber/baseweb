/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Stepper } from '..';

export function Scenario() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Stepper count={count} setCount={setCount} />
      <Stepper count={0} disabled={true} setCount={setCount} />
    </div>
  );
}
