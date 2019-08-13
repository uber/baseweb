/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../index.js';
import ArrowRight from '../../icon/arrow-right.js';

export const name = 'button';

export const component = () => (
  <React.Fragment>
    <Button>Primary</Button>
    <br />
    <Button startEnhancer={ArrowRight}>Start Enhancer</Button>
    <br />
    <Button endEnhancer={ArrowRight}>End Enhancer</Button>
    <br />
    <Button startEnhancer={ArrowRight} endEnhancer={ArrowRight}>
      Both Enhancers
    </Button>
  </React.Fragment>
);
