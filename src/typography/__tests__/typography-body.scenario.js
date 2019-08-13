/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
  Label1,
  Label2,
  Label3,
  Label4,
  Caption1,
  Caption2,
} from '../index.js';

export const name = 'typography-body';

export const component = () => (
  <div style={{width: '768px'}}>
    <Label1>We ignite opportunity by setting the world in motion.</Label1>
    <Paragraph1>
      We ignite opportunity by setting the world in motion.
    </Paragraph1>
    <Label2>We ignite opportunity by setting the world in motion.</Label2>
    <Paragraph2>
      We ignite opportunity by setting the world in motion.
    </Paragraph2>
    <Label3>We ignite opportunity by setting the world in motion.</Label3>
    <Paragraph3>
      We ignite opportunity by setting the world in motion.
    </Paragraph3>
    <Label4>We ignite opportunity by setting the world in motion.</Label4>
    <Paragraph4>
      We ignite opportunity by setting the world in motion.
    </Paragraph4>
    <Caption2>We ignite opportunity by setting the world in motion.</Caption2>
    <Caption1>We ignite opportunity by setting the world in motion.</Caption1>
  </div>
);
