/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from '../input/stateful-container.js';
import PaymentCard from './payment-card.js';
import type {StatefulPaymentCardPropsT} from './types.js';

export default function StatefulPaymentCard(props: StatefulPaymentCardPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: *) => <PaymentCard {...childrenProps} />}
    </StatefulContainer>
  );
}
