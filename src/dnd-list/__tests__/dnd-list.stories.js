/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import DndListDefault from './dnd-list.scenario.js';
import {Layer} from '../../layer/index.js';

export const DndList = () => <DndListDefault />;

export const TestLayer = () => (
  <div>
    Something
    <Layer>
      <div>Inside Layer</div>
    </Layer>
  </div>
);
