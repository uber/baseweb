// @flow
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState([25, 75]);
  return (
    <Slider
      value={value}
      onChange={({value}) => value && setValue(value)}
    />
  );
};
