/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { DENSITY } from '../constants';

import { Calendar } from '../index';

export function Scenario() {
  return (
    <div>
      <p>Default</p>
      <Calendar highlightedDate={new Date('2019-02-22T10:00:00Z')} />
      <p>Dense</p>
      <Calendar density={DENSITY.high} highlightedDate={new Date('2019-02-22T10:00:00Z')} />
    </div>
  );
}
