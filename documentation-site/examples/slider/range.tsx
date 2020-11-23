import * as React from 'react';
import {Slider, SliderState} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState<SliderState['value']>([
    25,
    75,
  ]);
  return (
    <Slider value={value} onChange={({value}) => setValue(value)} />
  );
};
