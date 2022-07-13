/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FormControl } from '../../form-control';
import { useStyletron } from '../../styles';
import { Combobox } from '..';

type OptionT = {
  label: string;
  id: string;
};

const options: OptionT[] = [
  { label: 'AliceBlue', id: '#F0F8FF' },
  { label: 'AntiqueWhite', id: '#FAEBD7' },
  { label: 'Aqua', id: '#00FFFF' },
  { label: 'Aquamarine', id: '#7FFFD4' },
  { label: 'Azure', id: '#F0FFFF' },
  { label: 'Beige', id: '#F5F5DC' },
];

export function Scenario() {
  const [css] = useStyletron();
  const [value, setValue] = React.useState('');
  return (
    <div className={css({ width: '375px', padding: '12px 48px' })}>
      <FormControl label="label" caption="caption">
        <Combobox
          id="combobox"
          listBoxLabel="Color list"
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          mapOptionToString={(o) => o.label}
          options={options}
        />
      </FormControl>
    </div>
  );
}
