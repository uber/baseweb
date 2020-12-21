// @flow
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default function Example() {
  const [value, setValue] = React.useState([60]);
  return (
    <Slider
      value={value}
      onChange={({value}) => value && setValue(value)}
    />
  );
}
