// @flow
import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {PinCode} from 'baseui/pin-code';

export default () => {
  const [values, setValues] = React.useState(['', '', '', '']);
  const buttonRef = React.useRef(null);
  return (
    <Block display="flex">
      <PinCode
        values={values}
        onChange={({values}) => {
          setValues(values);
          // if all of our inputs are filled in,
          // shift focus to our submit button
          if (!values.includes('')) {
            buttonRef.current && buttonRef.current.focus();
          }
        }}
      />
      <Button ref={buttonRef}>Submit</Button>
    </Block>
  );
};
