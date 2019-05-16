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
import {ChevronRight} from '../icon/index.js';

import {countries} from './countries.js';
import flags from './flags/flags@2x.js';

import {styled} from '../styles/index.js';

const ChevronDown = styled(ChevronRight, {
  transform: 'rotate(90deg)',
});

export default function PhoneInput(props) {
  const {value, initialCountry, onInputChange, onCountryChange} = props;
  const [selectValue, setSelectValue] = useState(
    [initialCountry] || [countries[0]],
  );
  return (
    <>
      <Input
        value={value}
        onChange={event => onInputChange(event)}
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
                  value={selectValue}
                  onChange={event => {
                    setSelectValue(event.value);
                    onCountryChange(event.option);
                  }}
                  maxDropdownHeight="300px"
                  getOptionLabel={({option}) => {
                    return (
                      <Block display="flex" alignItems="center" width="100%">
                        <Block
                          as="img"
                          src={flags[option.iso2]}
                          maxWidth="18px"
                          marginRight="12px"
                        />
                        <Block paddingRight="4px">{option.name}</Block>
                        <Block marginLeft="auto">+{option.dialCode}</Block>
                      </Block>
                    );
                  }}
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
                              src={flags[selectValue[0].iso2]}
                              alt="Flag"
                              maxWidth="24px"
                              marginRight="6px"
                            />
                            <ChevronDown size={24} />
                          </Block>
                        );
                      },
                    },
                    DropdownContainer: {
                      style: {
                        width: '350px',
                      },
                    },
                    ValueContainer: {
                      style: {
                        width: '0',
                      },
                    },
                    Input: {
                      style: {
                        width: '0',
                      },
                    },
                  }}
                />
              </Block>
              <Block marginLeft="4px">+{selectValue[0].dialCode}</Block>
            </Block>
          ),
        }}
      />
    </>
  );
}
