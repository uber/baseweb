import * as React from 'react';
import {Slider, SliderState} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState<SliderState['value']>(
    60,
  );
  return (
    <Slider
      value={value}
      onChange={({value}: SliderState) => setValue(value)}
    />
  );
};
