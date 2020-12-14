import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import valid from 'card-validator';
import {Override} from '../overrides';
import {
  SIZE,
  StatefulContainer,
  InputProps,
  InputOverrides,
  StatefulContainerProps,
} from '../input';

export {SIZE, StatefulContainer};

export {valid};

export type PaymentCardOverrides = InputOverrides & {
  IconWrapper?: Override<any>;
};

export type PaymentCardProps = InputProps & {overrides?: PaymentCardOverrides};
export type StatefulPaymentCardProps = InputProps &
  StatefulContainerProps & {children?: never; overrides?: PaymentCardOverrides};

export const StatefulPaymentCard: React.FC<StatefulPaymentCardProps>;
export class PaymentCard extends React.Component<PaymentCardProps> {}

export const StyledIconWrapper: StyletronComponent<any>;
