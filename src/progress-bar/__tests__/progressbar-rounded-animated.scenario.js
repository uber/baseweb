/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {ProgressBarRounded, SIZE} from '../index.js';

export default function Scenario() {
  // Mimic some loading
  const [progress, setProgress] = React.useState(0);
  const tracker = React.useRef(0);
  React.useEffect(() => {
    function tick() {
      setProgress(progress => progress + Math.random() * 0.33);
      if (tracker.current < 1) {
        setTimeout(tick, Math.random() * 1000);
      }
    }
    tick();
  }, []);
  React.useEffect(() => {
    tracker.current = progress;
  }, [progress]);
  return (
    <React.Fragment>
      <ProgressBarRounded progress={progress} size={SIZE.small} />
      <br />
      <ProgressBarRounded progress={progress} size={SIZE.medium} />
      <br />
      <ProgressBarRounded progress={progress} size={SIZE.large} />
    </React.Fragment>
  );
}
