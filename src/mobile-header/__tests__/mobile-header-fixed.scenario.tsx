/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { MobileHeader } from '..';
import { ArrowLeft, Plus, Check } from '../../icon';
import { Button } from '../../button';

export function Scenario() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setExpanded(!expanded)}>{expanded ? 'Collapse' : 'Expand'}</Button>
      <div
        style={{
          width: '375px',
          border: '1px solid #ECECEC',
          marginTop: '100px',
          marginBottom: '100px',
          backgroundColor: 'pink',
        }}
      >
        <MobileHeader
          title="Header title"
          expanded={expanded}
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
          title="Excessively long title that truncates"
          expanded={expanded}
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
