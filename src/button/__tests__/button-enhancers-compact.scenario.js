/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, SIZE} from '../index.js';
import ArrowRight from '../../icon/arrow-right.js';

export const name = 'button-enhancers-compact';

export const component = () => (
  <React.Fragment>
    <Button size={SIZE.compact}>Primary</Button>
    <Button size={SIZE.compact} startEnhancer={ArrowRight}>
      Start Enhancer
    </Button>
    <Button size={SIZE.compact} endEnhancer={ArrowRight}>
      End Enhancer
    </Button>
    <Button
      size={SIZE.compact}
      startEnhancer={ArrowRight}
      endEnhancer={ArrowRight}
    >
      Both Enhancers
    </Button>
  </React.Fragment>
);
