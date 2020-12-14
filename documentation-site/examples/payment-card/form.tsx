import * as React from 'react';
import {PaymentCard, valid} from 'baseui/payment-card';
import {MaskedInput} from 'baseui/input';
import {FormControl} from 'baseui/form-control';
import {useStyletron} from 'baseui';

function getFormOverrides(width: string) {
  return {
    ControlContainer: {
      style: {
        width,
        margin: '5px',
      },
    },
  };
}

export default function Example() {
  const [number, setNumber] = React.useState('');
  const [expiration, setExpiration] = React.useState('');
  const [code, setCode] = React.useState('');
  const [css] = useStyletron();

  const {card} = valid.number(number);
  let codeLength;

  if (card && card.code && card.code.size) {
    codeLength = card.code.size;
  }

  return (
    <div className={css({display: 'flex'})}>
      <FormControl
        overrides={getFormOverrides('250px')}
        caption="Card number"
      >
        <PaymentCard
          value={number}
          onChange={event => setNumber(event.currentTarget.value)}
          placeholder="Card number"
        />
      </FormControl>
      <FormControl
        overrides={getFormOverrides('90px')}
        caption="Expiration date"
      >
        <MaskedInput
          value={expiration}
          onChange={event =>
            setExpiration(event.currentTarget.value)
          }
          placeholder="MM/YY"
          mask="99/99"
        />
      </FormControl>
      <FormControl
        overrides={getFormOverrides('70px')}
        caption="CVC"
      >
        <MaskedInput
          value={code}
          onChange={event => setCode(event.currentTarget.value)}
          placeholder="CVC"
          mask={codeLength ? '9'.repeat(codeLength) : '999'}
        />
      </FormControl>
    </div>
  );
}
