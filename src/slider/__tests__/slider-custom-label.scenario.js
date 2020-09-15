/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';

import {Slider} from '../index.js';

export default function Scenario() {
  const [rangeValue, setRangeValue] = React.useState([45, 50]);
  return (
    <div style={{margin: '64px'}}>
      <Slider
        value={rangeValue}
        onChange={({value}) => value && setRangeValue(value)}
        overrides={{
          ThumbValue: {
            props: {
              valueToLabel: l => l + ':00 AM',
            },
          },
        }}
      />
    </div>
  );
}
