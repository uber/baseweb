/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Unstable_StatefulCalendar as StatefulCalendar} from '../index.js';

export const name = 'Stateful calendar';

export const component = () => (
  <StatefulCalendar highlightedDate={new Date('2019-02-14T10:00:00Z')} />
);
