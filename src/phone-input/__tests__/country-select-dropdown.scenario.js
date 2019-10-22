/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import React from 'react';
import {StatefulPhoneInput, SIZE} from '../index.js';

export const name = 'country-select-dropdown';

window.vrt = {
  interactions: [
    {
      name: 'expanded',
      behavior: async page => {
        const selectSelector = `[data-baseweb="select"]`;
        const dropdownSelector = `[data-baseweb="menu"]`;
        page.waitForSelector(selectSelector);
        page.click(selectSelector);
        page.waitForSelector(dropdownSelector);
        await page.waitFor(1000);
      },
    },
  ],
};

export const component = () => (
  <React.Fragment>
    <StatefulPhoneInput size={SIZE.compact} />
    <br />
    <StatefulPhoneInput />
    <br />
    <StatefulPhoneInput size={SIZE.large} />
  </React.Fragment>
);
