/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ButtonTimed } from '..';
import { Button, KIND } from '../../button';

export function Scenario() {
  const [finished1, setFinished1] = React.useState(false);
  const [finished2, setFinished2] = React.useState(false);
  const [finished3, setFinished3] = React.useState(false);
  const [finished4, setFinished4] = React.useState(false);

  const [paused, setPaused] = React.useState(true);

  return (
    <div>
      <Button kind={KIND.secondary} onClick={() => setPaused(!paused)}>
        {paused ? 'Run' : 'Pause'}
      </Button>

      <div>
        <ButtonTimed
          onClick={() => setFinished1(true)}
          initialTime={10}
          paused={paused}
          overrides={{
            BaseButton: { props: { 'data-testid': 'first' } },
          }}
        >
          Countdown
        </ButtonTimed>
        {finished1 && <span style={{ marginLeft: '20px', color: 'red' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setFinished2(true)} initialTime={18} paused={paused}>
          Countdown
        </ButtonTimed>
        {finished2 && <span style={{ marginLeft: '20px', color: 'blue' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setFinished3(true)} initialTime={35} paused={paused}>
          Countdown
        </ButtonTimed>
        {finished3 && <span style={{ marginLeft: '20px', color: 'gold' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setFinished4(true)} initialTime={60} paused={paused}>
          Countdown
        </ButtonTimed>
        {finished4 && <span style={{ marginLeft: '20px', color: 'green' }}>Time!</span>}
      </div>
    </div>
  );
}
