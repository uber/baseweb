// @flow
import * as React from 'react';
import {PaymentCard} from 'baseui/payment-card';

export default function Example() {
  const [value, setValue] = React.useState('4111111111111111');
  return (
    <PaymentCard
      onChange={event => setValue(event.target.value)}
      placeholder="Please enter your credit card number..."
      value={value}
    />
  );
}
