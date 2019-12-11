import * as React from 'react';
import {Select, Value} from 'baseui/select';

export default () => {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={[
        {id: 'AliceBlue', color: '#F0F8FF', optgroup: 'Blueish'},
        {
          id: 'AntiqueWhite',
          color: '#FAEBD7',
          optgroup: 'Whiteish',
        },
        {id: 'Aqua', color: '#00FFFF', optgroup: 'Blueish'},
        {id: 'Aquamarine', color: '#7FFFD4', optgroup: 'Blueish'},
        {id: 'Azure', color: '#F0FFFF', optgroup: 'Whiteish'},
        {id: 'Beige', color: '#F5F5DC', optgroup: 'Whiteish'},
        {id: 'Black', color: '#000000'},
      ]}
      labelKey="id"
      valueKey="color"
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};
