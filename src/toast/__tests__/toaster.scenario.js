/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, KIND as BUTTON_KIND, SIZE} from '../../button/index.js';
import {Toast, toaster, ToasterContainer, KIND, PLACEMENT} from '../index.js';
import type {KindTypeT} from '../types.js';

export const name = 'toaster';

export const component = () => (
  <React.Fragment>
    <ToasterContainer
      placement={PLACEMENT.bottomRight}
      autoHideDuration={500}
    />
    <Button
      onClick={() => {
        toaster.info('hi');
      }}
    >
      Info toast
    </Button>
  </React.Fragment>
);
