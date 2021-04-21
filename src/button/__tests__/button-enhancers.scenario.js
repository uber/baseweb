/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../index.js';
import ArrowRight from '../../icon/arrow-right.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <Button>Primary</Button>
      <Button startEnhancer={ArrowRight}>Start Enhancer</Button>
      <Button endEnhancer={ArrowRight}>End Enhancer</Button>
      <Button startEnhancer={ArrowRight} endEnhancer={ArrowRight}>
        Both Enhancers
      </Button>
    </React.Fragment>
  );
}
