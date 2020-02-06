import React, {useState} from 'react';
import {PhoneInput, COUNTRIES} from 'spaceweb/phone-input';

export default () => {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.US);
  return (
    <PhoneInput
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
};
