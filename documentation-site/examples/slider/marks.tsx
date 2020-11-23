import * as React from 'react';
import {Slider, SliderState} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState<SliderState['value']>([
    60,
  ]);
  return (
    <Slider
      value={value}
      step={10}
      marks
      onChange={({value}) => value && setValue(value)}
    />
  );
};
