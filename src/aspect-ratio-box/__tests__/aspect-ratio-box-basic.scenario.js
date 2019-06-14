/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {AspectRatioBox} from '../index.js';

export const name = 'aspect-ratio-basic';

const props = {
  overrides: {
    Root: {
      style: {
        width: '100%',
        border: 'grey solid 2px',
      },
    },
    Body: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
};

export const component = () => (
  <React.Fragment>
    <AspectRatioBox {...props}>Square by default</AspectRatioBox>
    <AspectRatioBox {...props} aspectRatio={16 / 9}>
      16:9 ratio
    </AspectRatioBox>
  </React.Fragment>
);
