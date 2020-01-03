/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {toaster, ToasterContainer, PLACEMENT} from '../index.js';

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
