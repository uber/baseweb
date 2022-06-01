/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Banner, ACTION_POSITION, HIERARCHY, KIND } from '../index.js';
import DeleteAlt from '../../icon/delete-alt.js';

const variants = [
  [HIERARCHY.low, KIND.info],
  [HIERARCHY.low, KIND.negative],
  [HIERARCHY.low, KIND.positive],
  [HIERARCHY.low, KIND.warning],
  [HIERARCHY.high, KIND.info],
  [HIERARCHY.high, KIND.negative],
  [HIERARCHY.high, KIND.positive],
  [HIERARCHY.high, KIND.warning],
];

export function Scenario() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '300px' }}>
        {variants.map(([hierarchy, kind], i) => (
          <Banner
            key={i}
            hierarchy={hierarchy}
            kind={kind}
            title="Headline text"
            action={{
              label: 'Label',
              onClick: () => {},
              position: ACTION_POSITION.below,
            }}
            artwork={{ icon: ({ size }) => <DeleteAlt size={size} /> }}
          >
            Paragraph text
          </Banner>
        ))}
      </div>
    </div>
  );
}
