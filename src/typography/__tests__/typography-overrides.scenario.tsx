/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { DisplayLarge, DisplayMedium, DisplaySmall, DisplayXSmall } from '..';

export function Scenario() {
  return (
    <div>
      <DisplayLarge $style={{ color: 'blue' }}>
        We ignite opportunity by setting the world in motion.
      </DisplayLarge>
    </div>
  );
}
