// @flow

import * as React from 'react';

import SelectFunctional from '../select-component-functional.js';

type OptionT = {title: string, hex: string};

const options: OptionT[] = [
  {title: 'AliceBlue', hex: '#F0F8FF'},
  {title: 'AntiqueWhite', hex: '#FAEBD7'},
  {title: 'Aqua', hex: '#00FFFF'},
  {title: 'Aquamarine', hex: '#7FFFD4'},
  {title: 'Azure', hex: '#F0FFFF'},
  {title: 'Beige', hex: '#F5F5DC'},
];

export default function Scenario() {
  const [value, setValue] = React.useState([]);
  return (
    <SelectFunctional
      options={options}
      // inspecting 'value' below in IDE shows a ValueT<empty> type
      onChange={({value}) => {
        // passes flow check
        console.log(value[0].title);

        // passes flow check, but should not
        console.log(value[0].does_not_exist);

        setValue(value);
      }}
      value={value}
      labelKey="title"
      valueKey="hex"
    />
  );
}
