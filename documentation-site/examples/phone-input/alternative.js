// @flow
import React, {useState} from 'react';
import {PhoneInputAlternative, COUNTRIES} from 'baseui/phone-input';

export default () => {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.US);
  return (
    <PhoneInputAlternative
      overrides={{
        Input: {
          props: {
            name: 'phone-input-alt',
          },
        },
      }}
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
