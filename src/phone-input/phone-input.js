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

export default function PhoneInput(props) {
  const {
    inputValue,
    onInputChange,
    countryValue,
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
                onChange={(...args) => {
                  inputRef.current.focus();
                  onCountryChange(...args);
                }}
                options={Object.values(countries)}
                labelKey="name"
                valueKey="iso2"
                clearable={false}
                searchable={false}
                maxDropdownHeight={maxDropdownHeight}
                getValueLabel={({option}) => {
                  return <Flag iso2={option.iso2} size={size} />;
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
