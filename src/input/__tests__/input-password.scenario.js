/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';
import {StatefulInput} from '../index.js';

export const name = 'input-password';

export const component = () => {
  const toggleSelector = `[data-screener="toggle"]`;
  const steps = new Steps()
    .wait(toggleSelector)
    .click(toggleSelector)
    .snapshot('Input with password masking toggle')
    .end();
  return (
    <Screener steps={steps}>
      <StatefulInput
        type="password"
        initialState={{value: '1234'}}
        overrides={{
          MaskToggleButton: {
            props: {
              'data-screener': 'toggle',
            },
          },
        }}
      />
    </Screener>
  );
};
