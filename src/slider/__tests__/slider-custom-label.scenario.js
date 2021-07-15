/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';

import {Slider} from '../index.js';

export default function Scenario() {
  const [rangeValue, setRangeValue] = React.useState([10, 75]);
  return (
    <div style={{margin: '64px'}}>
      <Slider
        value={rangeValue}
        max={24 * 4 - 1}
        min={0}
        valueToLabel={value => {
          const hour = Math.floor((value > 52 ? value - 48 : value) / 4);
          const minute = ((value % 4) * 15).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
          const meridiem = value > 95 / 2 ? 'PM' : 'AM';
          return `${hour === 0 ? '12' : hour}:${minute}  ${meridiem}`;
        }}
        onChange={({value}) => value && setRangeValue(value)}
        overrides={{
          ThumbValue: {
            style: {
              paddingBottom: '6px',
              paddingTop: '6px',
              top: '-48px',
            },
          },
        }}
      />
    </div>
  );
}
