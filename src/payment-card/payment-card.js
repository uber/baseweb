/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import valid from 'card-validator';

import {addGaps, getCaretPosition} from './utils.js';

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

class PaymentCard extends React.Component<PaymentCardPropsT> {
  caretPosition = 0;
  inRef: ?HTMLInputElement = null;

  static defaultProps = {
    autoComplete: 'cc-number',
    autoFocus: false,
    disabled: false,
    name: '',
    error: false,
    onBlur: () => {},
    onFocus: () => {},
    overrides: {},
    required: false,
    size: 'default',
    startEnhancer: null,
    endEnhancer: null,
  };

  componentDidUpdate(prevProps: PaymentCardPropsT) {
    if (this.inRef && prevProps.value !== this.props.value) {
      this.inRef.setSelectionRange(this.caretPosition, this.caretPosition);
    }
  }
  render() {
    const {
      overrides = {},
      size = SIZE.default,
      onChange,
      value,
      'aria-label': ariaLabel = 'Please enter a debit or credit card number.',
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
            aria-label={ariaLabel}
            data-baseweb="payment-card-input"
            inputMode="numeric"
            overrides={{
              ...overrides,
              Before: getBeforeComponent(theme),
            }}
            onChange={e => {
              const [position, value] = getCaretPosition(
                e.target.value,
                this.props.value || '',
                e.target.selectionStart,
              );
              this.caretPosition = position;
              this.inRef = e.target;
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

export default PaymentCard;
