import React, {useState} from 'react';
import {PhoneInputNext, COUNTRIES} from 'baseui/phone-input';

export default function Example() {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.US);
  return (
    <PhoneInputNext
      text={text}
      country={country}
      onTextChange={event => {
        setText(event.currentTarget.value);
      }}
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
    />
  );
}
