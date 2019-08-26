// @flow
import React, {useState} from 'react';
import {
  PhoneInput,
  COUNTRIES,
  StyledFlag,
} from 'baseui/phone-input';

function CustomFlag(props) {
  const {children, ...rest} = props;
  return <StyledFlag iso={props.$iso} {...rest} />;
}

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
      overrides={{
        FlagContainer: {
          component: CustomFlag,
        },
      }}
    />
  );
};
