/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Checkbox, STYLE_TYPE} from '../index.js';

export const name = 'checkbox-toggle-round';

export const component = () => (
  <div style={{width: '200px'}}>
    <Checkbox checkmarkType={STYLE_TYPE.toggle_round}>
      default unchecked
    </Checkbox>
    <Checkbox checkmarkType={STYLE_TYPE.toggle_round} checked>
      default checked
    </Checkbox>

    <Checkbox checkmarkType={STYLE_TYPE.toggle_round} disabled>
      disabled unchecked
    </Checkbox>
    <Checkbox checkmarkType={STYLE_TYPE.toggle_round} checked disabled>
      disabled checked
    </Checkbox>

    <Checkbox checkmarkType={STYLE_TYPE.toggle_round} isError>
      error unchecked
    </Checkbox>
    <Checkbox checkmarkType={STYLE_TYPE.toggle_round} checked isError>
      error checked
    </Checkbox>
  </div>
);
