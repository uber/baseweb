/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {SpinnerDeterminate} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <SpinnerDeterminate
        progress={0.5}
        animate={false}
        overrides={{
          Root: {
            style: {
              height: '200px',
              width: '433.33px',
            },
          },
          Svg: {
            style: {
              height: '200px',
              width: '433.33px',
            },
          },
          TrackBackground: {
            style: {
              stroke: 'pink',
            },
          },
          TrackForeground: {
            style: {
              stroke: 'red',
            },
          },
          Text: {
            style: {
              color: 'red',
              fontSize: '48px',
            },
          },
        }}
      />
    </React.Fragment>
  );
}
