/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Banner, HIERARCHY, Hierarchy, KIND, Kind } from '../index';
import Delete from '../../icon/delete';

const variants: Array<[Hierarchy, Kind]> = [
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
          <Banner key={i} hierarchy={hierarchy} kind={kind} title="Headline text">
            Paragraph text
          </Banner>
        ))}
      </div>

      <div style={{ width: '300px' }}>
        {variants.map(([hierarchy, kind], i) => (
          <Banner key={i} hierarchy={hierarchy} kind={kind}>
            Paragraph text
          </Banner>
        ))}
      </div>

      <div style={{ width: '300px' }}>
        {variants.map(([hierarchy, kind], i) => (
          <Banner
            key={i}
            hierarchy={hierarchy}
            kind={kind}
            action={{ label: 'Label', onClick: () => {} }}
          >
            Paragraph text
          </Banner>
        ))}
      </div>

      <div style={{ width: '300px' }}>
        {variants.map(([hierarchy, kind], i) => (
          <Banner
            key={i}
            hierarchy={hierarchy}
            kind={kind}
            action={{
              label: 'Label',
              icon: ({ size }) => <Delete size={size} />,
              onClick: () => {},
            }}
          >
            Paragraph text
          </Banner>
        ))}
      </div>
    </div>
  );
}
