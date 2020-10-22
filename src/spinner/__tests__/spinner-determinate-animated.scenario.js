/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {SpinnerDeterminate, SIZE} from '../index.js';

export default function Scenario() {
  // Mimic some loading
  const [x, xx] = React.useState(0);
  const foo = React.useRef(0);
  React.useEffect(() => {
    function tick() {
      xx(x => x + Math.random() * 0.33);
      if (foo.current < 1) {
        setTimeout(tick, Math.random() * 1000);
      }
    }
    tick();
  }, []);
  React.useEffect(() => {
    foo.current = x;
  }, [x]);
  return (
    <React.Fragment>
      <SpinnerDeterminate progress={x} size={SIZE.small} />
      <br />
      <SpinnerDeterminate progress={x} size={SIZE.medium} />
      <br />
      <SpinnerDeterminate progress={x} size={SIZE.large} />
    </React.Fragment>
  );
}
