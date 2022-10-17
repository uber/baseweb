/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { MobileHeader } from '..';
import { ArrowLeft, Plus, Check } from '../../icon';

export function Scenario() {
  return (
    <div style={{ width: '375px' }}>
      <MobileHeader
        title="Header Title"
        navButton={{
          icon: ArrowLeft,
          onClick: () => console.log('Nav Button Click'),
          ariaLabel: 'Go back',
        }}
        additionalButtons={[
          {
            icon: Check,
            onClick: () => console.log('Check Button Click'),
            ariaLabel: 'Confirm entries',
          },
          {
            icon: Plus,
            onClick: () => console.log('Plus Button Click'),
            ariaLabel: 'Add a new entry',
          },
        ]}
      />
    </div>
  );
}
