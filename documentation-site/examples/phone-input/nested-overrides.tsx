import React, {useState} from 'react';
import {PhoneInput, COUNTRIES} from 'baseui/phone-input';

export default () => {
  const [text, setText] = useState('');
  const [country, setCountry] = useState(COUNTRIES.US);
  return (
    <PhoneInput
      searchable
      text={text}
      country={country}
      onTextChange={event => {
        setText(event.currentTarget.value);
      }}
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
      overrides={{
        Input: {
          props: {
            overrides: {
              Root: {
                style: {
                  width: '300px',
                },
              },
            },
          },
        },
        FilterInput: {
          props: {
            overrides: {
              Before: {
                style: {
                  backgroundColor: 'salmon',
                },
              },
            },
          },
        },
      }}
    />
  );
};
