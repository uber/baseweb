import * as React from 'react';
import {Slider} from 'baseui/slider';

export default function Example() {
  const [value, setValue] = React.useState([25, 75]);
  return (
    <Slider value={value} onChange={({value}) => setValue(value)} />
  );
}
