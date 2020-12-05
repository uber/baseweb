import * as React from 'react';
import {Select, TYPE, Value} from 'baseui/select';

export default function Example() {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={[
        {id: 'AliceBlue', color: '#F0F8FF'},
        {id: 'AntiqueWhite', color: '#FAEBD7'},
        {id: 'Aqua', color: '#00FFFF'},
        {id: 'Aquamarine', color: '#7FFFD4'},
        {id: 'Azure', color: '#F0FFFF'},
        {id: 'Beige', color: '#F5F5DC'},
      ]}
      labelKey="id"
      valueKey="color"
      placeholder="Choose a color"
      maxDropdownHeight="300px"
      type={TYPE.search}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
}
