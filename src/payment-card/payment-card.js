/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import valid from 'card-validator';

import {getOverrides} from '../helpers/overrides.js';
import {Input, SIZE} from '../input/index.js';
import {ThemeContext} from '../styles/theme-provider.js';

import AmexIcon from './icons/amex.js';
import DinersClubIcon from './icons/dinersclub.js';
import DiscoverIcon from './icons/discover.js';
import EloIcon from './icons/elo.js';
import GenericIcon from './icons/generic.js';
import JcbIcon from './icons/jcb.js';
import MaestroIcon from './icons/maestro.js';
import MastercardIcon from './icons/mastercard.js';
import UnionPayIcon from './icons/unionpay.js';
import VisaIcon from './icons/visa.js';

import {IconWrapper as StyledIconWrapper} from './styled-components.js';

import type {PaymentCardPropsT} from './types.js';

const CardTypeToComponent = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  'american-express': AmexIcon,
  'diners-club': DinersClubIcon,
  discover: DiscoverIcon,
  jcb: JcbIcon,
  unionpay: UnionPayIcon,
  maestro: MaestroIcon,
  elo: EloIcon,
  generic: GenericIcon,
};

export const addGaps = (gaps: number[], value: string) =>
  gaps.reduce(
    (prev, gap, index) =>
      `${prev.slice(0, gap + index)} ${prev.slice(gap + index)}`.trim(),
    `${value}`,
  );

const PaymentCard = (props: PaymentCardPropsT) => {
  const {
    overrides = {},
    size = SIZE.default,
    onChange,
    value,
    ...restProps
  } = props;

  const [IconWrapper, iconWrapperProps] = getOverrides(
    overrides.IconWrapper,
    StyledIconWrapper,
  );

  const {sizing} = React.useContext(ThemeContext);
  const iconSize = {
    [SIZE.compact]: sizing.scale800,
    [SIZE.default]: sizing.scale900,
    [SIZE.large]: sizing.scale1000,
  };

  const validatedValue = valid.number(value);
  let gaps: number[] = [];
  let type: ?string = undefined;
  if (validatedValue.card) {
    gaps = validatedValue.card.gaps || [];
    type = validatedValue.card.type;
  }

  const BeforeComponent = () => (
    <IconWrapper $size={size} {...iconWrapperProps}>
      {React.createElement(
        CardTypeToComponent[type || 'generic'] || GenericIcon,
        {
          size: iconSize[size],
        },
      )}
    </IconWrapper>
  );

  return (
    <Input
      size={size}
      data-baseweb="payment-card"
      overrides={{
        ...overrides,
        Before: BeforeComponent,
      }}
      onChange={e => {
        e.target.value = e.target.value.replace(/[^0-9]/gi, '');
        onChange && onChange(e);
      }}
      value={addGaps(gaps, value || '')}
      {...restProps}
    />
  );
};

export default PaymentCard;
