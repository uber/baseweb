/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { StatefulSelect } from '../index';

// Menu component will render items with an href prop as an anchor.
// This does not make sense for Select, so ensure that it does not work.

export function Scenario() {
  return (
    <StatefulSelect
      startOpen
      options={[
        { id: 'a', label: 'hey!', href: 'https://baseui.design' },
        { id: 'b', label: 'are you listening?', href: 'https://baseui.design' },
        { id: 'c', label: 'look at me!', href: 'https://baseui.design' },
      ]}
    />
  );
}
