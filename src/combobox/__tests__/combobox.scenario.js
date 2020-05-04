// @flow

import * as React from 'react';

import {Combobox} from '../index.js';

type OptionT = {label: string, id: string};
const options: OptionT[] = [
  {label: 'AliceBlue', id: '#F0F8FF'},
  {label: 'AntiqueWhite', id: '#FAEBD7'},
  {label: 'Aqua', id: '#00FFFF'},
  {label: 'Aquamarine', id: '#7FFFD4'},
  {label: 'Azure', id: '#F0FFFF'},
  {label: 'Beige', id: '#F5F5DC'},
];

function Example() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <Combobox
        value={value}
        onChange={setValue}
        mapOptionToString={o => o.label}
        options={options}
      />
    </div>
  );
}

export default Example;
