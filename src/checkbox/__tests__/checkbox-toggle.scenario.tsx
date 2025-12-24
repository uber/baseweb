/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Checkbox, StatefulCheckbox, STYLE_TYPE } from '../index';

export function Scenario() {
  return (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox checkmarkType={STYLE_TYPE.toggle}>default unchecked</Checkbox>
      <Checkbox checkmarkType={STYLE_TYPE.toggle} checked>
        default checked
      </Checkbox>

      <Checkbox checkmarkType={STYLE_TYPE.toggle} disabled>
        disabled unchecked
      </Checkbox>
      <Checkbox checkmarkType={STYLE_TYPE.toggle} checked disabled>
        disabled checked
      </Checkbox>

      <Checkbox checkmarkType={STYLE_TYPE.toggle} error>
        error unchecked
      </Checkbox>
      <Checkbox checkmarkType={STYLE_TYPE.toggle} checked error>
        error checked
      </Checkbox>

      <Checkbox checkmarkType={STYLE_TYPE.toggle} checked>
        long label that should wrap to multiple lines to test how the toggle aligns with the text
      </Checkbox>
      <StatefulCheckbox checkmarkType={STYLE_TYPE.toggle}>stateful toggle</StatefulCheckbox>
      <StatefulCheckbox checkmarkType={STYLE_TYPE.toggle} error>
        stateful error toggle
      </StatefulCheckbox>
    </div>
  );
}
