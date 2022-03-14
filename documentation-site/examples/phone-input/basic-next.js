// @flow
import React, {useState} from 'react';
import {PhoneInputNext, COUNTRIES} from 'baseui/phone-input';

export default function Example() {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.US);
  return (
    <PhoneInputNext
      overrides={{
        Input: {
          props: {
            name: 'phone-input-alt',
          },
        },
      }}
      text={text}
      country={country}
      onTextChange={(event) => {
        setText(event.currentTarget.value);
      }}
      // flowlint-next-line unclear-type:off
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
    />
  );
}
