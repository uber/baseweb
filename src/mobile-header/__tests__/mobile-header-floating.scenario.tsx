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
    <div>
      <div
        style={{
          width: '375px',
          border: '1px solid #ECECEC',
          marginTop: '100px',
          marginBottom: '100px',
        }}
      >
        <MobileHeader
          type="floating"
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

      <div style={{ width: '375px', border: '1px solid #ECECEC', marginBottom: '100px' }}>
        <MobileHeader
          type="floating"
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
    </div>
  );
}
