/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { PhoneInput, COUNTRIES, StyledFlag } from '../../phone-input';
import type { CountryIso } from '../../phone-input';

function CustomFlag(props: { children: React.ReactNode; $iso: CountryIso }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props;
  //$FlowExpectedError[cannot-spread-inexact]
  return <StyledFlag iso={props.$iso} {...rest} />;
}

export function Scenario() {
  const [text, setText] = React.useState('');
  const [country, setCountry] = React.useState(COUNTRIES.US);
  return (
    <PhoneInput
      text={text}
      country={country}
      onTextChange={(event) => {
        setText(event.currentTarget.value);
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
      overrides={{
        FlagContainer: {
          component: CustomFlag,
        },
      }}
    />
  );
}
