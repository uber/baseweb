/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {
  SIZE,
  PhoneInputAlternative,
  StatefulPhoneInputAlternative,
} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <p>Uncontrolled (Stateful)</p>
      <StatefulPhoneInputAlternative
        onCountryChange={e => console.log('COUNTRY_CHANGED_1:', e)}
        onTextChange={e => console.log('NUMBER_CHANGED_1:', e)}
      />
      <p>Controlled (Stateless)</p>
      <PhoneInputAlternative
        onCountryChange={e => console.log('COUNTRY_CHANGED:', e)}
        onTextChange={e => console.log('NUMBER_CHANGED:', e)}
      />
      <p>Sizes</p>
      <StatefulPhoneInputAlternative size={SIZE.mini} />
      <br />
      <StatefulPhoneInputAlternative size={SIZE.compact} />
      <br />
      <StatefulPhoneInputAlternative />
      <br />
      <StatefulPhoneInputAlternative size={SIZE.large} />
      <p>States</p>
      <StatefulPhoneInputAlternative positive />
      <br />
      <StatefulPhoneInputAlternative error />
      <br />
    </React.Fragment>
  );
}
