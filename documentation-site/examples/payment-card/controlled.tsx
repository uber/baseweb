import * as React from 'react';
import {PaymentCard, SIZE} from 'baseui/payment-card';

export default () => {
  const [cardOne, setCardOne] = React.useState();
  const [cardTwo, setCardTwo] = React.useState();
  const [cardThree, setCardThree] = React.useState();

  return (
    <React.Fragment>
      <PaymentCard
        onChange={event =>
          setCardOne((event.target as HTMLInputElement).value)
        }
        placeholder="Enter payment card number"
        value={cardOne}
        size={SIZE.compact}
      />
      <br />
      <PaymentCard
        onChange={event =>
          setCardTwo((event.target as HTMLInputElement).value)
        }
        placeholder="Enter payment card number"
        value={cardTwo}
        size={SIZE.default}
      />
      <br />
      <PaymentCard
        onChange={event =>
          setCardThree((event.target as HTMLInputElement).value)
        }
        placeholder="Enter payment card number"
        value={cardThree}
        size={SIZE.large}
      />
    </React.Fragment>
  );
};
