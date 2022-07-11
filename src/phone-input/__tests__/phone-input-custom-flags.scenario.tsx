/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { PhoneInput, COUNTRIES, StyledFlag } from '../../phone-input/index';
import type { CountryIsoT } from '../../phone-input/index';

function CustomFlag(props: { children: React.ReactNode; $iso: CountryIsoT }) {
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
      // flowlint-next-line unclear-type:off
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
