/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {SIZE, PhoneInputNext, StatefulPhoneInputNext} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <p>Uncontrolled (Stateful)</p>
      <StatefulPhoneInputNext
        onCountryChange={e => console.log('COUNTRY_CHANGED_1:', e)}
        onTextChange={e => console.log('NUMBER_CHANGED_1:', e)}
      />
      <p>Controlled (Stateless)</p>
      <PhoneInputNext
        onCountryChange={e => console.log('COUNTRY_CHANGED:', e)}
        onTextChange={e => console.log('NUMBER_CHANGED:', e)}
      />
      <p>Sizes</p>
      <StatefulPhoneInputNext size={SIZE.mini} />
      <br />
      <StatefulPhoneInputNext size={SIZE.compact} />
      <br />
      <StatefulPhoneInputNext />
      <br />
      <StatefulPhoneInputNext size={SIZE.large} />
      <p>States</p>
      <StatefulPhoneInputNext positive />
      <br />
      <StatefulPhoneInputNext error />
      <br />
    </React.Fragment>
  );
}
