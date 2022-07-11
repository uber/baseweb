/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulMenu } from '../index';

export function Scenario() {
  function handleParentKeyDown(event) {
    event.stopPropagation();
  }
  return (
    <div role="button" tabIndex="0" onKeyDown={handleParentKeyDown}>
      <StatefulMenu
        items={[
          { label: 'Item One' },
          { label: 'Item Two' },
          { label: 'Item Three' },
          { label: 'Item Four' },
        ]}
      />
    </div>
  );
}
