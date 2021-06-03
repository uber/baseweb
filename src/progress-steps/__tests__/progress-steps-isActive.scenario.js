/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {ProgressSteps, Step} from '../index.js';

const ProgressStepsIsActive = () => {
  return (
    <ProgressSteps current={1}>
      <Step title="Step 1" isActive>
        <Block font="font400">
          Content should be visible, due to the isActive prop
        </Block>
      </Step>
      <Step title="Step 2" isActive>
        <Block font="font400">
          Content should be visible, due to the isActive prop
        </Block>
      </Step>
      <Step title="Step 3" isActive>
        <Block font="font400">
          Content should be visible, due to the isActive prop
        </Block>
      </Step>
    </ProgressSteps>
  );
};

export default ProgressStepsIsActive;
