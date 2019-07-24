import * as React from 'react';
import {StatefulPaymentCard} from 'baseui/payment-card';

export default () => (
  <StatefulPaymentCard
    placeholder="Enter payment card number"
    onChange={event =>
      console.log((event.target as HTMLInputElement).value)
    }
  />
);
