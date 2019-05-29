import React, {useState} from 'react';
import {PhoneInput, countries} from 'baseui/phone-input';

export default () => {
  const [input, setInput] = useState(
    `+${countries.find(c => c.id === 'JP').dialCode} `,
  );
  const [country, setCountry] = useState(countries.find(c => c.id === 'JP'));
  return (
    <PhoneInput
      inputValue={input}
      countryValue={country}
      onInputChange={event => {
        setInput(event.target.value);
      }}
      onCountryChange={event => {
        setInput(
          input.replace('+' + country.dialCode, '+' + event.option.dialCode),
        );
        setCountry(event.option);
      }}
    />
  );
};
