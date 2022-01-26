/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {FormControl} from '../../form-control/index.js';
import {useStyletron} from '../../styles/index.js';
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

export function Scenario() {
  const [css] = useStyletron();
  const [value, setValue] = React.useState('');
  return (
    <div className={css({width: '375px', padding: '12px 48px'})}>
      <FormControl label="label" caption="caption">
        <Combobox
          id="combo"
          value={value}
          onChange={nextValue => setValue(nextValue)}
          mapOptionToString={o => o.label}
          options={options}
        />
      </FormControl>
      <FormControl label="label" caption="caption" positive="positive message">
        <Combobox
          id="combobox_positive"
          value={value}
          onChange={nextValue => setValue(nextValue)}
          mapOptionToString={o => o.label}
          options={options}
        />
      </FormControl>
      <FormControl label="label" caption="caption" error="error message">
        <Combobox
          id="combobox_error"
          value={value}
          onChange={nextValue => setValue(nextValue)}
          mapOptionToString={o => o.label}
          options={options}
        />
      </FormControl>
    </div>
  );
}
