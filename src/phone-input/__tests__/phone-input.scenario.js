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
  <Block>
    <StatefulPhoneInput />
    {/* Test overrides */}
    <StatefulPhoneInput
      overrides={{
        Input: {},
        CountrySelect: {
          style: {
            outline: `2px solid #F6BA8B`,
            backgroundColor: '#F6BA8B',
          },
        },
        CountrySelectDropdown: {style: {background: 'purple'}},
        CountrySelectDropdownListItem: {style: {textDecoration: 'underline'}},
        CountrySelectDropdownFlagColumn: {style: {border: 'solid 1px black'}},
        CountrySelectDropdownNameColumn: {style: {fontWeight: 'bold'}},
        CountrySelectDropdownDialcodeColumn: {style: {fontStyle: 'italic'}},
      }}
    />
  </Block>
);
