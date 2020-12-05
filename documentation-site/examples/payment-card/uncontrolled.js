// @flow
import * as React from 'react';
import {StatefulPaymentCard} from 'baseui/payment-card';

export default function Example() {
  return (
    <StatefulPaymentCard
      placeholder="Please enter your credit card number..."
      onChange={e => console.log(e.target.value)}
    />
  );
}
