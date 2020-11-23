import * as React from 'react';
import {Slider, SliderState} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState<SliderState['value']>([
    40,
  ]);
  return (
    <Slider
      disabled
      value={value}
      onChange={({value}) => setValue(value)}
    />
  );
};
