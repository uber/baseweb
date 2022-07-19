/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block } from '../index';

export function Scenario() {
  return (
    <div>
      <Block $style={{ color: 'blue' }}>hello</Block>
      <Block overrides={{ Block: { style: { color: 'green' } } }}>world</Block>
    </div>
  );
}
