/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {SIZE, PhoneInput, StatefulPhoneInput} from '../index.js';

export function Scenario() {
  return (
    <React.Fragment>
      <p>Uncontrolled (Stateful)</p>
      <StatefulPhoneInput
        onCountryChange={e => console.log('COUNTRY_CHANGED_1:', e)}
        onTextChange={e => console.log('NUMBER_CHANGED_1:', e)}
      />

      <p>Controlled (Stateless)</p>
      <PhoneInput
        onCountryChange={e => console.log('COUNTRY_CHANGED:', e)}
        onTextChange={e => console.log('NUMBER_CHANGED:', e)}
      />

      <p>Sizes</p>
      <StatefulPhoneInput size={SIZE.mini} />
      <br />
      <StatefulPhoneInput size={SIZE.compact} />
      <br />
      <StatefulPhoneInput />
      <br />
      <StatefulPhoneInput size={SIZE.large} />
      <p>States</p>
      <StatefulPhoneInput positive />
      <br />
      <StatefulPhoneInput error />
      <br />
    </React.Fragment>
  );
}
