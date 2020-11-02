/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';
import {HelperSteps} from '../helper-steps.js';

const LENGTH = 5;

export default function Scenario() {
  const [css] = useStyletron();
  const [index, setIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  function handleFinish() {
    setFinished(true);
  }

  function handlePrev() {
    setIndex(prev => Math.max(prev - 1, 0));
  }

  function handleNext() {
    setIndex(prev => Math.min(prev + 1, LENGTH - 1));
  }

  return (
    <div className={css({width: '375px'})}>
      <HelperSteps
        index={index}
        length={LENGTH}
        onFinish={handleFinish}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <p>current step index: {index}</p>
      <p>is finished: {String(finished)}</p>
    </div>
  );
}
