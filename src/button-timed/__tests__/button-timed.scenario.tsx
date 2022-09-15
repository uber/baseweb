/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ButtonTimed } from '..';

export function Scenario() {
  const [time1, setTime1] = React.useState(false);
  const [time2, setTime2] = React.useState(false);
  const [time3, setTime3] = React.useState(false);
  const [time4, setTime4] = React.useState(false);
  return (
    <div>
      <div>
        <ButtonTimed
          onClick={() => setTime1(true)}
          time={10}
          overrides={{ BaseButtonTimed: { props: { 'data-id': 'first' } } }}
        >
          Countdown
        </ButtonTimed>
        {time1 && <span style={{ marginLeft: '20px', color: 'red' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setTime2(true)} time={18}>
          Countdown
        </ButtonTimed>
        {time2 && <span style={{ marginLeft: '20px', color: 'blue' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setTime3(true)} time={35}>
          Countdown
        </ButtonTimed>
        {time3 && <span style={{ marginLeft: '20px', color: 'gold' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setTime4(true)} time={60}>
          Countdown
        </ButtonTimed>
        {time4 && <span style={{ marginLeft: '20px', color: 'green' }}>Time!</span>}
      </div>
    </div>
  );
}
