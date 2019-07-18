// @flow
import * as React from 'react';
import {PaymentCard} from 'baseui/payment-card';

const DefaultValue = () => {
  const [value, setValue] = React.useState('4111111111111111');
  return (
    <PaymentCard
      onChange={event => setValue(event.target.value)}
      placeholder="Enter payment card number"
      value={value}
    />
  );
};

export default DefaultValue;
