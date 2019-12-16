import * as React from 'react';
import {Select, Value} from 'baseui/select';

const options = {
  __ungrouped: [{id: 'Black', color: '#000000'}],
  Blueish: [
    {id: 'AliceBlue', color: '#F0F8FF'},
    {id: 'Aqua', color: '#00FFFF'},
    {id: 'Aquamarine', color: '#7FFFD4'},
  ],
  Whiteish: [
    {id: 'AntiqueWhite', color: '#FAEBD7'},
    {id: 'Azure', color: '#F0FFFF'},
    {id: 'Beige', color: '#F5F5DC'},
  ],
};

export default () => {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={options}
      labelKey="id"
      valueKey="color"
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};
