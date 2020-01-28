/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  PhoneInput,
  COUNTRIES,
  CountrySelectDropdown,
  StyledFlag,
} from '../../phone-input/index.js';
import type {CountryIsoT} from '../../phone-input/index.js';

export const name = 'phone-input-custom-flags';

function CustomFlag(props: {children: React.Node, $iso: CountryIsoT}) {
  const {children, ...rest} = props;
  return <StyledFlag iso={props.$iso} {...rest} />;
}

export const component = () => {
  const [text, setText] = React.useState('');
  const [country, setCountry] = React.useState(COUNTRIES.US);
  return (
    <PhoneInput
      text={text}
      country={country}
      onTextChange={event => {
        setText(event.currentTarget.value);
      }}
      // eslint-disable-next-line flowtype/no-weak-types
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
      overrides={{
        FlagContainer: {
          component: CustomFlag,
        },
        CountrySelect: {
          props: {
            overrides: {
              Dropdown: {
                component: CountrySelectDropdown,
              },
            },
          },
        },
      }}
    />
  );
};
