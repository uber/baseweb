// @flow
import React, {useState} from 'react';
import {PhoneInput, COUNTRIES} from 'baseui/phone-input';

export default function Example() {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.US);
  return (
    <PhoneInput
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
