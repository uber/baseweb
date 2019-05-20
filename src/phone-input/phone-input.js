/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState, useRef} from 'react';

import {Block} from '../block/index.js';
import {Input} from '../input/index.js';
import {Select} from '../select/index.js';
import {countries} from './countries.js';

import flagsSpriteSmall from './flags/flags.png';
import flagsSpriteMedium from './flags/flags@2x.png';
import flagsSpriteLarge from './flags/flags@3x.png';
import flagsSpriteMapSmall from './flags/flags.js';
import flagsSpriteMapMedium from './flags/flags@2x.js';
import flagsSpriteMapLarge from './flags/flags@3x.js';

const FLAG_SIZES = {
  compact: {
    width: 21,
    height: 15,
    sprite: flagsSpriteSmall,
    map: flagsSpriteMapSmall,
  },
  default: {
    width: 42,
    height: 30,
    sprite: flagsSpriteMedium,
    map: flagsSpriteMapMedium,
  },
  large: {
    width: 63,
    height: 45,
    sprite: flagsSpriteLarge,
    map: flagsSpriteMapLarge,
  },
};

function Flag(props) {
  const {size = 'compact'} = props;
  return (
    <div
      style={{
        width: FLAG_SIZES[size].width,
        height: FLAG_SIZES[size].height,
        backgroundRepeat: 'none',
        backgroundImage: `url(${FLAG_SIZES[size].sprite})`,
        backgroundPosition: `-${FLAG_SIZES[size].map[props.iso2].x}px -${
          FLAG_SIZES[size].map[props.iso2].y
        }px`,
      }}
    />
  );
}

export function StatefulPhoneInput(props) {
  // TODO: add default country prop
  const {size} = props;
  const US = countries.find(c => c.iso2 === 'US');
  const [phoneNumber, setPhoneNumber] = useState(`+${US.dialCode} `);
  const [country, setCountry] = useState(US);
  return (
    <PhoneInput
      size={size}
      inputValue={phoneNumber}
      country={country}
      initialCountry={country}
      onInputChange={event => {
        setPhoneNumber(event.target.value);
        if (props.onChange) props.onChange(phoneNumber);
      }}
      onCountryChange={event => {
        // Replace (if possible) the current country dialcode
        const newPhoneNumber = phoneNumber.replace(
          `+${country.dialCode}`,
          `+${event.option.dialCode}`,
        );
        // If the replacement did nothing, just return the new dialcode
        setPhoneNumber(
          phoneNumber === newPhoneNumber
            ? `+${event.option.dialCode} `
            : newPhoneNumber,
        );
        setCountry(event.option);
      }}
    />
  );
}

export function PhoneInput(props) {
  const inputEl = useRef(null);
  const {inputValue, country, onInputChange, onCountryChange, size} = props;
  return (
    <Input
      size={size}
      inputRef={inputEl}
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
                value={[country]}
                onChange={(...args) => {
                  inputEl.current.focus();
                  onCountryChange(...args);
                }}
                options={countries}
                labelKey="name"
                valueKey="iso2"
                clearable={false}
                searchable={false}
                maxDropdownHeight="300px"
                getValueLabel={({option}) => {
                  return <Flag iso2={option.iso2} size={size} />;
                }}
                getOptionLabel={({option}) => {
                  return (
                    <Block display="flex" alignItems="center" width="100%">
                      <Flag iso2={option.iso2} />
                      <Block marginLeft="8px">{option.name}</Block>
                      <Block marginLeft="auto">+{option.dialCode}</Block>
                    </Block>
                  );
                }}
                overrides={{
                  ControlContainer: {
                    style: {
                      width: '56px',
                    },
                  },
                  DropdownContainer: {
                    style: {
                      width: '100%',
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
                }}
              />
            );
          },
        },
      }}
    />
  );
}
