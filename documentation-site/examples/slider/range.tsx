import * as React from 'react';
import {Slider} from 'spaceweb/slider';

export default () => {
  const [value, setValue] = React.useState([25, 75]);
  return (
    <Slider value={value} onChange={({value}) => setValue(value)} />
  );
};
