/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block } from '../../block';
import { Button } from '../../button';
import { ProgressSteps, NumberedStep } from '..';

export function Scenario() {
  const [current, setCurrent] = React.useState(1);
  return (
    <ProgressSteps current={current}>
      <NumberedStep title="Create Account">
        <Block data-e2e="content-1" font="font400">
          Here is some step content
        </Block>
        <Button data-e2e="button-next" onClick={() => setCurrent(1)}>
          Next
        </Button>
      </NumberedStep>
      <NumberedStep title="Verify Payment">
        <Block data-e2e="content-2" font="font400">
          Here is some more content
        </Block>
        <Button data-e2e="button-previous" onClick={() => setCurrent(0)}>
          Previous
        </Button>
        <Button onClick={() => setCurrent(2)}>Next</Button>
      </NumberedStep>
      <NumberedStep title="Add Payment Method">
        <Block data-e2e="content-3" font="font400">
          Here too!
        </Block>
        <Button onClick={() => setCurrent(1)}>Previous</Button>
      </NumberedStep>
    </ProgressSteps>
  );
}
