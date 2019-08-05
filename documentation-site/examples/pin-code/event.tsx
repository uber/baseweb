import React from 'react';
import {PinCode} from 'baseui/pin-code';

export default () => {
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <PinCode
      values={values}
      manageFocus={false}
      onChange={({values, event}) => {
        setValues(values);
        alert(event.target);
      }}
    />
  );
};
