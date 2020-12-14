import * as React from 'react';
import {Slider} from 'baseui/slider';

export default function Example() {
  const [value, setValue] = React.useState([90]);
  return (
    <Slider
      value={value}
      min={-300}
      max={300}
      step={10}
      onChange={({value}) => setValue(value)}
    />
  );
}
