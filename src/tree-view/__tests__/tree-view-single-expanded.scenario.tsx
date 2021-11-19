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
    isExpanded: true,
    children: [
      {
        id: 2,
        label: 'Child 1.1',
        isExpanded: true,
        children: [
          {
            id: 3,
            label: 'Grandchild 1.1.1',
            isExpanded: true,
            children: [
              {
                id: 4,
                label: 'Greatgrandchild 1.1.1.1',
                isExpanded: true,
              },

              {
                id: 5,
                label: 'Greatgrandchild 1.1.1.2',
              },

              {
                id: 6,
                label: 'Greatgrandchild 1.1.1.3',
              },
            ],
          },

          {
            id: 7,
            label: 'Grandchild 1.1.2',
            children: [
              {
                id: 8,
                label: 'Greatgrandchild 1.1.2.1',
              },

              {
                id: 9,
                label: 'Greatgrandchild 1.1.2.2',
              },

              {
                id: 10,
                label: 'Greatgrandchild 1.1.2.3',
              },
            ],
          },

          {
            id: 11,
            label: 'Grandchild 1.1.3',
            children: [
              {
                id: 12,
                label: 'Greatgrandchild 1.1.3.1',
              },

              {
                id: 13,
                label: 'Greatgrandchild 1.1.3.2',
              },

              {
                id: 14,
                label: 'Greatgrandchild 1.1.3.3',
              },
            ],
          },
        ],
      },

      {
        id: 15,
        label: 'Child 1.2',
        children: [
          {
            id: 16,
            label: 'Grandchild 1.2.1',
            isExpanded: true,
            children: [
              {
                id: 17,
                label: 'Greatgrandchild 1.2.1.1',
                isExpanded: true,
              },

              {
                id: 18,
                label: 'Greatgrandchild 1.2.1.2',
              },

              {
                id: 19,
                label: 'Greatgrandchild 1.2.1.3',
              },
            ],
          },

          {
            id: 20,
            label: 'Grandchild 1.2.2',
            children: [
              {
                id: 21,
                label: 'Greatgrandchild 1.2.2.1',
              },

              {
                id: 22,
                label: 'Greatgrandchild 1.2.2.2',
              },

              {
                id: 23,
                label: 'Greatgrandchild 1.2.2.3',
              },
            ],
          },

          {
            id: 24,
            label: 'Grandchild 1.2.3',
            children: [
              {
                id: 25,
                label: 'Greatgrandchild 1.2.3.1',
              },

              {
                id: 26,
                label: 'Greatgrandchild 1.2.3.2',
              },

              {
                id: 27,
                label: 'Greatgrandchild 1.2.3.3',
              },
            ],
          },
        ],
      },

      {
        id: 28,
        label: 'Child 1.3',
        children: [
          {
            id: 29,
            label: 'Grandchild 1.3.1',
            isExpanded: true,
            children: [
              {
                id: 30,
                label: 'Greatgrandchild 1.3.1.1',
                isExpanded: true,
              },

              {
                id: 31,
                label: 'Greatgrandchild 1.3.1.2',
              },

              {
                id: 32,
                label: 'Greatgrandchild 1.3.1.3',
              },
            ],
          },

          {
            id: 33,
            label: 'Grandchild 1.3.2',
            children: [
              {
                id: 34,
                label: 'Greatgrandchild 1.3.2.1',
              },

              {
                id: 35,
                label: 'Greatgrandchild 1.3.2.2',
              },

              {
                id: 36,
                label: 'Greatgrandchild 1.3.2.3',
              },
            ],
          },

          {
            id: 37,
            label: 'Grandchild 1.3.3',
            children: [
              {
                id: 38,
                label: 'Greatgrandchild 1.3.3.1',
              },

              {
                id: 39,
                label: 'Greatgrandchild 1.3.3.2',
              },

              {
                id: 40,
                label: 'Greatgrandchild 1.3.3.3',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 41,
    label: 'Node 2',
    children: [
      {
        id: 42,
        label: 'Child 2.1',
        children: [
          {
            id: 43,
            label: 'Grandchild 2.1.1',
          },

          {
            id: 44,
            label: 'Grandchild 2.1.2',
          },

          {
            id: 45,
            label: 'Grandchild 2.1.3',
          },
        ],
      },

      {
        id: 46,
        label: 'Child 2.2',
        children: [
          {
            id: 47,
            label: 'Grandchild 2.2.1',
          },

          {
            id: 48,
            label: 'Grandchild 2.2.2',
          },

          {
            id: 49,
            label: 'Grandchild 2.2.3',
          },
        ],
      },

      {
        id: 50,
        label: 'Child 2.3',
        children: [
          {
            id: 51,
            label: 'Grandchild 2.3.1',
          },

          {
            id: 52,
            label: 'Grandchild 2.3.2',
          },

          {
            id: 53,
            label: 'Grandchild 2.3.3',
          },
        ],
      },
    ],
  },
];

export function Scenario() {
  return <StatefulTreeView singleExpanded={true} data={initialData} />;
}
