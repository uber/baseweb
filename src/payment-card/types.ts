/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { InputComponents, InputProps, StInputPropsDiff } from '../input';
import type { Override } from '../helpers/overrides';

export type PaymentCardComponents = {
  IconWrapper?: Override;
} & InputComponents;

export type PaymentCardProps = {
  overrides: PaymentCardComponents;
} & InputProps;

export type StatefulPaymentCardProps = {
  overrides?: PaymentCardComponents;
} & StInputPropsDiff;
