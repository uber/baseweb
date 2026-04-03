/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ProgressBar, SIZE, INTENT } from '..';

export function Scenario() {
  return (
    <>
      <h3>Determinate - All Intents</h3>
      <ProgressBar value={50} showLabel intent={INTENT.default} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.positive} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.warning} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.negative} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.brand} />
      <br />

      <h3>Indeterminate - All Intents</h3>
      <ProgressBar infinite showLabel intent={INTENT.default} />
      <br />
      <ProgressBar infinite showLabel intent={INTENT.positive} />
      <br />
      <ProgressBar infinite showLabel intent={INTENT.warning} />
      <br />
      <ProgressBar infinite showLabel intent={INTENT.negative} />
      <br />
      <ProgressBar infinite showLabel intent={INTENT.brand} />
      <br />

      <h3>Different Sizes with Intent</h3>
      <ProgressBar value={60} showLabel size={SIZE.small} intent={INTENT.positive} />
      <br />
      <ProgressBar value={60} showLabel size={SIZE.medium} intent={INTENT.warning} />
      <br />
      <ProgressBar value={60} showLabel size={SIZE.large} intent={INTENT.negative} />
      <br />

      <h3>Segmented with Intent</h3>
      <ProgressBar value={60} showLabel steps={5} intent={INTENT.positive} />
      <br />
      <ProgressBar value={60} showLabel steps={5} intent={INTENT.warning} />
      <br />
      <ProgressBar value={60} showLabel steps={5} intent={INTENT.negative} />
    </>
  );
}
