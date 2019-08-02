import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {PinCode} from 'baseui/pin-code';

export default () => {
  const [showPinCode, toggle] = React.useState(false);
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <Block display="flex">
      <Button onClick={() => toggle(s => !s)}>Mount PinCode</Button>
      <Block marginLeft="scale300" />
      {showPinCode ? (
        <PinCode
          values={values}
          onChange={({values}) => {
            setValues(values);
          }}
          autoFocus
        />
      ) : null}
    </Block>
  );
};
