import React, {useState} from 'react';
import {Select} from 'baseui/select';

const OPTIONS = [
  {id: 'AliceBlue', color: '#F0F8FF'},
  {id: 'AntiqueWhite', color: '#FAEBD7'},
  {id: 'Aqua', color: '#00FFFF'},
  {id: 'Aquamarine', color: '#7FFFD4'},
  {id: 'Azure', color: '#F0FFFF'},
  {id: 'Beige', color: '#F5F5DC'},
];

const App = () => {
  const [value, setValue] = useState<any>([]);
  return (
    <Select
      options={OPTIONS}
      labelKey="id"
      valueKey="color"
      searchable={false}
      clearable={false}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};

export default App;
