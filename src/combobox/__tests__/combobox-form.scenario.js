/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
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
  const [valueAtSubmission, setValueAtSubmission] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setValueAtSubmission(value);
  }

  return (
    <div className={css({padding: '12px 48px'})}>
      <form onSubmit={handleSubmit} className={css({display: 'flex'})}>
        <div className={css({width: '375px'})}>
          <Combobox
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onSubmit={({closeListbox}) => closeListbox()}
            mapOptionToString={(o) => o.label}
            options={options}
          />
        </div>
        <Button>Search</Button>
      </form>
      <div>
        <p>{valueAtSubmission}</p>
      </div>
    </div>
  );
}
