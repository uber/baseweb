/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { StatefulCalendar } from '../index.js';
import { zhCN } from 'date-fns/locale/index.js';

export function Scenario() {
  return <StatefulCalendar highlightedDate={new Date('2019-02-14T10:00:00Z')} locale={zhCN} />;
}
