import React from 'react';
import {PinCode} from 'spaceweb/pin-code';

export default () => {
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <React.Fragment>
      <PinCode
        manageFocus={false}
        values={values}
        onChange={({values}) => {
          setValues(values);
        }}
      />
    </React.Fragment>
  );
};
