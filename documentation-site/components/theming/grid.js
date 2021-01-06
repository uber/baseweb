/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Property} from './common.js';

export function Grid() {
  return (
    <React.Fragment>
      <Property
        name="columns"
        concern="grid"
        renderValue={() => `['4px', '8px', '12px']`}
      />
      <Property
        name="gutters"
        concern="grid"
        renderValue={() => `['16px', '36px', '36px']`}
      />
      <Property
        name="margins"
        concern="grid"
        renderValue={() => `['16px', '36px', '64px']`}
      />
      <Property name="gaps" concern="grid" renderValue={() => '0'} />
      <Property name="maxWidth" concern="grid" renderValue={() => '1280px'} />
    </React.Fragment>
  );
}
