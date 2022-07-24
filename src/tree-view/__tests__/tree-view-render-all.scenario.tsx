/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulTreeView } from '..';

const initialData = [
  {
    id: 1,
    label: 'Node 1',
    children: [
      {
        id: 2,
        label: 'Child 1',
        children: [
          {
            id: 3,
            label: 'Grandchild 1',
            children: [
              {
                id: 4,
                label: 'hidden',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 5,
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        id: 6,
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            id: 7,
            label: 'Grandchild 2',
          },
        ],
      },
    ],
  },
];

export function Scenario() {
  return <StatefulTreeView renderAll={true} data={initialData} />;
}
