/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Checkbox, STYLE_TYPE} from '../index.js';

export const name = 'checkbox-toggle';

export const component = () => (
  <div style={{width: '200px'}}>
    <React.Fragment>
      <Checkbox checkmarkType={STYLE_TYPE.toggle}>basic</Checkbox>
      <br />
      <Checkbox checked checkmarkType={STYLE_TYPE.toggle}>
        checked
      </Checkbox>
      <br />
      <Checkbox isError checkmarkType={STYLE_TYPE.toggle}>
        error
      </Checkbox>
      <br />
      <Checkbox isError checked checkmarkType={STYLE_TYPE.toggle}>
        error checked
      </Checkbox>
      <br />
      <Checkbox disabled checkmarkType={STYLE_TYPE.toggle}>
        disabled
      </Checkbox>
      <br />
      <Checkbox disabled checked checkmarkType={STYLE_TYPE.toggle}>
        disabled checked
      </Checkbox>
    </React.Fragment>
  </div>
);
