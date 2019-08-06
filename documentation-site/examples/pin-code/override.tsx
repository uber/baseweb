import React from 'react';
import {PinCode} from 'baseui/pin-code';

const overrides = {
  Input: {
    props: {
      overrides: {
        InputContainer: {
          style: {
            // use longhand CSS properties
            backgroundColor: 'lightgreen',
            borderColor: 'seagreen',
          },
        },
      },
    },
  },
};

export default () => {
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <PinCode
      overrides={overrides}
      values={values}
      onChange={({values}) => {
        setValues(values);
      }}
    />
  );
};
