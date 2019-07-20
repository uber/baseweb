import React, {useState} from 'react';
import {PhoneInput, COUNTRIES} from 'baseui/phone-input';

export default () => {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.JP);
  return (
    <PhoneInput
      text={text}
      country={country}
      onTextChange={event => {
        setText((event.target as HTMLInputElement).value);
      }}
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
    />
  );
};
