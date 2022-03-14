/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import { useStyletron } from '../../styles/index.js';

import {
  Unstable_StatefulHelper as StatefulHelper,
  Unstable_HelperSteps as HelperSteps,
  PLACEMENT,
} from '../index.js';

function Content({ index, length, onPrev, onNext, onFinish }) {
  const [css] = useStyletron();
  return (
    <div className={css({ width: '256px', padding: '16px' })}>
      <div className={css({ height: '128px' })}>
        <p>step number: {index + 1}</p>
      </div>
      <HelperSteps
        index={index}
        length={length}
        onPrev={onPrev}
        onNext={onNext}
        onFinish={onFinish}
      />
    </div>
  );
}

const LENGTH = 5;

export function Scenario() {
  const [css] = useStyletron();
  const [index, setIndex] = React.useState(0);

  function handleFinish() {
    setIndex(0);
  }

  function handlePrev() {
    setIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleNext() {
    setIndex((prev) => Math.min(prev + 1, LENGTH - 1));
  }

  return (
    <div className={css({ backgroundColor: 'lightblue', padding: '48px' })}>
      <StatefulHelper
        placement={PLACEMENT.bottomLeft}
        content={({ close }) => (
          <Content
            index={index}
            length={LENGTH}
            onPrev={handlePrev}
            onNext={handleNext}
            onFinish={() => {
              close();
              handleFinish();
            }}
          />
        )}
      >
        <span>click</span>
      </StatefulHelper>
    </div>
  );
}
