/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Toast } from '../index';

export function Scenario() {
  const [values, setValues] = React.useState([0, 1, 2]);

  function handleClose(idx) {
    setValues(values.filter((_n, i) => i !== idx));
  }

  return (
    <div id="test-container">
      {values.map((n, idx) => {
        return (
          <div key={n} data-testid={n}>
            <Toast closeable onClose={() => handleClose(idx)}>
              <span>{String(n)}</span>
            </Toast>
          </div>
        );
      })}
    </div>
  );
}
