import * as React from 'react';
import {Slider} from 'spaceweb/slider';

export default () => {
  const [value, setValue] = React.useState([40]);
  return (
    <Slider
      disabled
      value={value}
      onChange={({value}) => setValue(value)}
    />
  );
};
