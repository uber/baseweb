/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ButtonTimed as ButtonTimedBase } from '..';

const ButtonTimed = (props) => {
  const { initialTime, onClick: onClickProp, children } = props;
  const [timeRemaining, setTimeRemaining] = React.useState<number>(initialTime);

  React.useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((seconds) => seconds - 1);
      }
    }, 1000);
    if (timeRemaining === 0) {
      onClickProp();
    }
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const onClick = () => {
    setTimeRemaining(0);
    onClickProp();
  };

  return (
    <ButtonTimedBase
      {...props}
      onClick={onClick}
      timeRemaining={timeRemaining}
      overrides={{ BaseButtonTimed: { props: { 'data-id': 'first' } } }}
    >
      {children}
    </ButtonTimedBase>
  );
};

export function Scenario() {
  const [finished1, setFinished1] = React.useState(false);
  const [finished2, setFinished2] = React.useState(false);
  const [finished3, setFinished3] = React.useState(false);
  const [finished4, setFinished4] = React.useState(false);

  return (
    <div>
      <div>
        <ButtonTimed onClick={() => setFinished1(true)} initialTime={10}>
          Countdown
        </ButtonTimed>
        {finished1 && <span style={{ marginLeft: '20px', color: 'red' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setFinished2(true)} initialTime={18}>
          Countdown
        </ButtonTimed>
        {finished2 && <span style={{ marginLeft: '20px', color: 'blue' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setFinished3(true)} initialTime={35}>
          Countdown
        </ButtonTimed>
        {finished3 && <span style={{ marginLeft: '20px', color: 'gold' }}>Time!</span>}
      </div>

      <div>
        <ButtonTimed onClick={() => setFinished4(true)} initialTime={60}>
          Countdown
        </ButtonTimed>
        {finished4 && <span style={{ marginLeft: '20px', color: 'green' }}>Time!</span>}
      </div>
    </div>
  );
}
