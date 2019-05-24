/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useRef} from 'react';

import {countries, SIZE} from './constants.js';
import CountrySelect from './country-select.js';
import Flag from './flag.js';
import {Input} from '../input/index.js';
import {Select} from '../select/index.js';

import type {PropsT} from './types.js';

export default function PhoneInput(props: PropsT) {
  const {
    inputValue,
    countryValue,
    onInputChange,
    onCountryChange,
    size = SIZE.default,
    maxDropdownHeight = '400px',
    maxDropdownWidth = '400px',
  } = props;
  const inputRef = useRef(null);
  return (
    <Input
      size={size}
      inputRef={inputRef}
      value={inputValue}
      onChange={onInputChange}
      overrides={{
        Input: {
          style: {
            paddingLeft: '4px',
          },
        },
        Before: {
          component: function Before() {
            return (
              <Select
                size={size}
                value={[countryValue]}
                onChange={event => {
                  if (inputRef && inputRef.current) {
                    inputRef.current.focus();
                  }
                  onCountryChange(event);
                }}
                options={countries}
                clearable={false}
                searchable={false}
                maxDropdownHeight={maxDropdownHeight}
                getValueLabel={({option}) => {
                  return option.id ? (
                    <Flag iso2={String(option.id)} size={size} />
                  ) : null;
                }}
                overrides={{
                  ValueContainer: {
                    style: {
                      width: {
                        [SIZE.compact]: '34px',
                        [SIZE.default]: '42px',
                        [SIZE.large]: '50px',
                      }[size],
                    },
                  },
                  IconsContainer: {
                    style: {
                      paddingRight: '0',
                    },
                  },
                  SingleValue: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  },
                  DropdownContainer: {
                    style: {
                      width: maxDropdownWidth,
                      maxWidth: 'calc(100vw - 10px)',
                    },
                  },
                  Dropdown: {
                    component: CountrySelect,
                    props: {
                      maxDropdownHeight: maxDropdownHeight,
                    },
                  },
                }}
              />
            );
          },
        },
      }}
    />
  );
}
