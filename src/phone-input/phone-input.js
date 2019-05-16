/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';

import {Block} from '../block/index.js';
import {Input} from '../input/index.js';
import {Select} from '../select/index.js';
import {TriangleDown} from '../icon/index.js';

import {countries} from './countries.js';
import flags from './flags/flags@2x.js';

export default function PhoneInput() {
  const [value, setValue] = useState([countries[0]]);
  return (
    <>
      <Input
        overrides={{
          Input: {style: {paddingLeft: '4px'}},
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center">
              <Block>
                <Select
                  options={countries}
                  labelKey="name"
                  valueKey="dialCode"
                  clearable={false}
                  size="compact"
                  onChange={({value}) => setValue(value)}
                  value={value}
                  overrides={{
                    IconsContainer: {
                      style: {paddingRight: '0', cursor: 'pointer'},
                    },
                    SelectArrow: {
                      component: function Foo() {
                        return (
                          <Block display="flex" alignItems="center">
                            <Block
                              as="img"
                              src={flags[value[0].iso2]}
                              alt="Flag"
                              maxWidth="24px"
                            />
                            <TriangleDown size={14} />
                          </Block>
                        );
                      },
                    },
                    Dropdown: {
                      style: {
                        maxHeight: '300px',
                      },
                    },
                    DropdownContainer: {
                      style: {
                        width: '250px',
                      },
                    },
                    ValueContainer: {
                      style: {
                        width: '0',
                      },
                    },
                  }}
                />
              </Block>
              <Block marginLeft="4px">+{value[0].dialCode}</Block>
            </Block>
          ),
        }}
      />
    </>
  );
}
