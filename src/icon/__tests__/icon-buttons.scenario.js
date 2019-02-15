/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Button, SHAPE} from '../../button/index.js';
import Upload from '../upload.js';

export const name = 'icon-buttons';

export const component = () => (
  <div>
    <Button startEnhancer={Upload}>Start Enhancer</Button>
    <br />
    <br />
    <Button endEnhancer={Upload}>End Enhancer</Button>
    <br />
    <br />
    <Button shape={SHAPE.square}>
      <Upload />
    </Button>
  </div>
);
