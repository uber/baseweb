/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {
  InputComponentsT,
  InputPropsT,
  StInputPropsDiffT,
} from '../input/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type PaymentCardComponentsT = {
  ...InputComponentsT,
  IconWrapper?: OverrideT<*>,
};

export type PaymentCardPropsT = {
  ...InputPropsT,
  overrides: PaymentCardComponentsT,
};

export type StatefulPaymentCardPropsT = {
  ...StInputPropsDiffT,
  overrides?: PaymentCardComponentsT,
};
