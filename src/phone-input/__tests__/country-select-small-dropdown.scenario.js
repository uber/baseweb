/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';
import {StatefulPhoneInput} from '../index.js';

export const name = 'phone-input-small-dropdown';

export const component = () => {
  const selectSelector = `[data-baseweb="select"]`;
  return (
    <Screener
      steps={new Steps()
        .wait(selectSelector)
        .click(selectSelector)
        .snapshot(
          'Phone input with small dropdown (should see highlighted USA flag)',
        )
        .end()}
    >
      <StatefulPhoneInput maxDropdownHeight="100px" />
    </Screener>
  );
};
