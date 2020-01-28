import omit from 'just-omit';
import {PaymentCard} from 'baseui/payment-card';
import {ADJOINED, SIZE} from 'baseui/input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import {theme, inputProps} from './input';

const paymentCardProps = require('!!extract-react-types-loader!../../../../src/payment-card/payment-card.js');

const PaymentCardConfig: TConfig = {
  imports: {
    'baseui/payment-card': {named: ['PaymentCard']},
  },
  scope: {
    PaymentCard,
    SIZE,
    ADJOINED,
  },
  theme,
  props: {
    value: {
      ...inputProps.value,
      value: '',
    },
    ...omit(inputProps, [
      'type',
      'startEnhancer',
      'endEnhancer',
      'value',
      'placeholder',
    ]),
    placeholder: {
      ...inputProps.placeholder,
      value: undefined,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Input', 'InputContainer', 'IconWrapper'],
        sharedProps: {
          $isFocused: {
            type: PropTypes.Boolean,
            description: 'True when the component is focused.',
          },
          $disabled: 'disabled',
          $error: 'error',
          $positive: 'positive',
          $adjoined: 'adjoined',
          $size: 'size',
          $required: 'required',
        },
      },
    },
  },
  mapTokensToProps: {
    PaymentCard: paymentCardProps,
  },
};

export default PaymentCardConfig;
