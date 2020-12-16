import React from 'react';
import {PinCode} from 'baseui/pin-code';

export default function Example() {
  const [valuesA, setValuesA] = React.useState(['', '', '', '']);
  const [valuesB, setValuesB] = React.useState(['', '', '', '']);

  return (
    <React.Fragment>
      <PinCode
        mask
        values={valuesA}
        onChange={({values}) => {
          setValuesA(values);
        }}
      />
      <br />
      <PinCode
        mask="*"
        values={valuesB}
        onChange={({values}) => {
          setValuesB(values);
        }}
      />
    </React.Fragment>
  );
}
