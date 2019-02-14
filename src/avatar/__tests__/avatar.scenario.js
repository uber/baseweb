/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Avatar} from '../index.js';

export const name = 'avatar';

export const component = () => (
  <React.Fragment>
    {['scale800', 'scale1000', 'scale1200', 'scale1400', '64px'].map(
      (size, index) => (
        <Avatar
          name={`user name # ${index}`}
          size={size}
          src={`https://api.adorable.io/avatars/285/${index}@adorable.io.png`}
          key={size}
        />
      ),
    )}
  </React.Fragment>
);
