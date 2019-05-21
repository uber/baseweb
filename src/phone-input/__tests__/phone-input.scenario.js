/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPhoneInput} from '../index.js';
import {Block} from '../../block/index.js';

export const name = 'phone-input';

export const component = () => (
  <>
    <Block marginBottom="10px">
      <StatefulPhoneInput size="compact" />
    </Block>
    <Block marginBottom="10px">
      <StatefulPhoneInput size="default" />
    </Block>
    <Block marginBottom="10px">
      <StatefulPhoneInput size="large" />
    </Block>
  </>
);
