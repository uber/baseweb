// @flow
import * as React from 'react';
import {PaymentCard} from 'baseui/payment-card';
import {Block} from 'baseui/block';

export default () => {
  const [value, setValue] = React.useState();
  return (
    <PaymentCard
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
      placeholder="Please enter your credit card number..."
    />
  );
};
