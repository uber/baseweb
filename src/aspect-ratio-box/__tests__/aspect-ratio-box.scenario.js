/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {AspectRatioBox, AspectRatioBoxBody} from '../index.js';

export const name = 'aspect-ratio-box';

const bodyProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overrides: {
    Block: {
      style: {
        border: 'grey solid 2px',
      },
    },
  },
};

export const component = () => (
  <React.Fragment>
    <AspectRatioBox>
      <AspectRatioBoxBody {...bodyProps}>Square by default</AspectRatioBoxBody>
    </AspectRatioBox>
    <AspectRatioBox aspectRatio={16 / 9}>
      <AspectRatioBoxBody {...bodyProps}>16:9 aspect ratio</AspectRatioBoxBody>
    </AspectRatioBox>
  </React.Fragment>
);
