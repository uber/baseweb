/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';

import {PhoneInput} from '../index.js';
import Block from '../../block/block.js';
import {countries} from '../countries.js';

export const name = 'phone-input-form';

const Example1 = () => {
  const [phoneNumber, setPhoneNumber] = useState('3236847652');
  const [country, setCountry] = useState(countries[5]);
  return (
    <Block>
      <PhoneInput
        value={phoneNumber}
        initialCountry={country}
        onInputChange={event => setPhoneNumber(event.target.value)}
        onCountryChange={setCountry}
      />
      <Block marginTop="15px">
        state: +{country.dialCode} {phoneNumber}
      </Block>
    </Block>
  );
};

const Example2 = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const US = countries.find(c => c.iso2 === 'US');
  const [country, setCountry] = useState(US);
  return (
    <Block>
      <PhoneInput
        value={phoneNumber}
        initialCountry={country}
        onInputChange={event => setPhoneNumber(event.target.value)}
        onCountryChange={setCountry}
      />
      <Block marginTop="15px">
        state: +{country.dialCode} {phoneNumber}
      </Block>
    </Block>
  );
};

export const component = () => (
  <>
    <Example1 />
    <Example2 />
  </>
);
