import React from 'react';
import {PinCode} from 'baseui/pin-code';
import {SIZE} from 'baseui/input';

export default function Example() {
  const [valuesA, setValuesA] = React.useState(['', '', '', '']);
  const [valuesB, setValuesB] = React.useState(['', '', '', '']);
  const [valuesC, setValuesC] = React.useState(['', '', '', '']);
  return (
    <React.Fragment>
      <PinCode
        size={SIZE.compact}
        values={valuesA}
        onChange={({values}) => {
          setValuesA(values);
        }}
      />
      <br />
      <PinCode
        values={valuesB}
        onChange={({values}) => {
          setValuesB(values);
        }}
      />
      <br />
      <PinCode
        size={SIZE.large}
        values={valuesC}
        onChange={({values}) => {
          setValuesC(values);
        }}
      />
    </React.Fragment>
  );
}
