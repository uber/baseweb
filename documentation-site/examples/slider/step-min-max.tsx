import * as React from 'react';
import {Slider, SliderState} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState<SliderState['value']>([
    90,
  ]);
  return (
    <Slider
      value={value}
      min={-300}
      max={300}
      step={10}
      onChange={({value}) => setValue(value)}
    />
  );
};
