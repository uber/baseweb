/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {ProgressBarRounded, SIZE} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <ProgressBarRounded
        progress={0.5}
        size={SIZE.small}
        animate={false}
        inline
      />
      <ProgressBarRounded
        progress={0.5}
        size={SIZE.medium}
        animate={false}
        inline
      />
      <ProgressBarRounded
        progress={0.5}
        size={SIZE.large}
        animate={false}
        inline
      />
    </React.Fragment>
  );
}
