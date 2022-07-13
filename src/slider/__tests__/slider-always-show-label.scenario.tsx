/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable react/display-name*/

import * as React from 'react';

import { Slider, StatefulSlider } from '..';

export function Scenario() {
  const [rangeValue, setRangeValue] = React.useState([10, 70]);
  return (
    <div>
      <div style={{ margin: '64px' }}>
        <Slider
          persistentThumb
          value={rangeValue}
          max={24 * 4 - 1}
          min={0}
          valueToLabel={(value) => {
            const hour = Math.floor((value > 52 ? value - 48 : value) / 4);
            const minute = ((value % 4) * 15).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            });

            const meridiem = value > 95 / 2 ? 'PM' : 'AM';
            return `${hour === 0 ? '12' : hour}:${minute}  ${meridiem}`;
          }}
          onChange={({ value }) => value && setRangeValue(value)}
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
      <div style={{ margin: '64px' }}>
        <StatefulSlider initialState={{ value: [50] }} disabled persistentThumb />
      </div>
      <div style={{ margin: '64px' }}>
        <StatefulSlider
          initialState={{ value: [20] }}
          step={10}
          min={0}
          max={100}
          marks
          persistentThumb
        />
      </div>
      <div style={{ margin: '64px' }}>
        <StatefulSlider initialState={{ value: [25, 60] }} persistentThumb />
      </div>
      <div style={{ margin: '64px' }}>
        <StatefulSlider
          initialState={{ value: [0] }}
          step={5}
          min={-300}
          max={300}
          persistentThumb
        />
      </div>
    </div>
  );
}
