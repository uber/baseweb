// @flow
import * as React from 'react';
import {StatefulPaymentCard} from 'baseui/payment-card';

export default () => (
  <StatefulPaymentCard
    placeholder="Enter payment card number"
    onChange={e => console.log(e.target.value)}
  />
);
