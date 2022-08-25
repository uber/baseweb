/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { useStyletron } from '../../styles';
import { Unstable_HelperSteps as HelperSteps } from '..';

const LENGTH = 5;

export function Scenario() {
  const [css, theme] = useStyletron();
  const [index, setIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  function handleFinish() {
    setFinished(true);
  }

  function handlePrev() {
    setIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleNext() {
    setIndex((prev) => Math.min(prev + 1, LENGTH - 1));
  }

  return (
    <div className={css({ width: '375px' })}>
      <HelperSteps
        index={index}
        length={LENGTH}
        onFinish={handleFinish}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <div className={css({ color: theme.colors.contentPrimary })}>
        <p>current step index: {index}</p>
        <p>is finished: {String(finished)}</p>
      </div>
    </div>
  );
}
