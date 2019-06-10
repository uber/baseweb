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

export const sanitizeNumber = (input: string) => {
  const number = input.replace(/[^0-9]/gi, '');
  const validatedValue = valid.number(number);
  if (validatedValue.card && Array.isArray(validatedValue.card.lengths)) {
    return number.slice(
      0,
      validatedValue.card.lengths[validatedValue.card.lengths.length - 1],
    );
  }
  // CC number NEVER can have more than 19 digits
  return number.slice(0, 19);
};

const getPos = (value, prevValue, pos) => {
  const cleanValue = sanitizeNumber(value);
  const validatedValue = valid.number(cleanValue);

  // crossing a gap forward
  if (validatedValue.card && Array.isArray(validatedValue.card.gaps)) {
    const gaps = validatedValue.card.gaps;
    const valueWithGaps = addGaps(gaps, cleanValue);
    if (
      cleanValue.length > prevValue.length &&
      valueWithGaps[pos - 1] === ' '
    ) {
      return [pos + 1, cleanValue];
    }
  }

  // deleting a gap
  const prevValidatedValue = valid.number(prevValue);
  if (prevValidatedValue.card && Array.isArray(prevValidatedValue.card.gaps)) {
    const gaps = prevValidatedValue.card.gaps;
    const valueWithGaps = addGaps(gaps, prevValue);
    if (prevValue === cleanValue && valueWithGaps.length > value.length) {
      const newValue =
        valueWithGaps.slice(0, pos - 1) + valueWithGaps.slice(pos);
      return [pos - 1, sanitizeNumber(newValue)];
    }
  }
  return [pos, cleanValue];
};
class PaymentCard extends React.Component<PaymentCardPropsT> {
  caretPosition = 0;
  inRef = React.createRef();
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.inRef.current.setSelectionRange(
        this.caretPosition,
        this.caretPosition,
      );
    }
  }
  render() {
    const {
      overrides = {},
      size = SIZE.default,
      onChange,
      value,
      ...restProps
    } = this.props;

    const [IconWrapper, iconWrapperProps] = getOverrides(
      overrides.IconWrapper,
      StyledIconWrapper,
    );

    const validatedValue = valid.number(value);
    let gaps: number[] = [];
    let type: ?string = undefined;
    if (validatedValue.card) {
      gaps = validatedValue.card.gaps || [];
      type = validatedValue.card.type;
    }

    const getBeforeComponent = theme => {
      const iconSize = {
        [SIZE.compact]: theme.sizing.scale800,
        [SIZE.default]: theme.sizing.scale900,
        [SIZE.large]: theme.sizing.scale1000,
      };
      return () => (
        <IconWrapper $size={size} {...iconWrapperProps}>
          {React.createElement(
            CardTypeToComponent[type || 'generic'] || GenericIcon,
            {
              size: iconSize[size],
            },
          )}
        </IconWrapper>
      );
    };

    return (
      <ThemeContext.Consumer>
        {theme => (
          <Input
            size={size}
            data-baseweb="payment-card"
            inputMode="numeric"
            inputRef={this.inRef}
            overrides={{
              ...overrides,
              Before: getBeforeComponent(theme),
            }}
            onChange={e => {
              const [pos, value] = getPos(
                e.target.value,
                this.props.value || '',
                e.target.selectionStart,
              );
              this.caretPosition = pos;
              e.target.value = value;
              onChange && onChange(e);
            }}
            value={addGaps(gaps, value || '')}
            {...restProps}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}
PaymentCard.defaultProps = Input.defaultProps;
PaymentCard.defaultProps.autoComplete = 'cc-number';

export default PaymentCard;
