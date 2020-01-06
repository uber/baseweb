/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulList} from '../index.js';

export const name = 'dnd-list';

export const component = () => (
  <StatefulList
    initialState={{
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }}
    overrides={{
      Root: {
        style: {
          width: '344px',
        },
      },
    }}
  />
);
