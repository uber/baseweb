// @flow
import React, {useState} from 'react';
import {PhoneInput, COUNTRIES} from 'baseui/phone-input';

const iso2FlagEmoji = (iso: any) =>
  String.fromCodePoint(
    ...Array.from(iso.toUpperCase()).map(
      char => char.charCodeAt(0) + 127397,
    ),
  );

export default function Example() {
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
      mapIsoToLabel={iso => iso2FlagEmoji(iso)}
    />
  );
}
