/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Select} from '../index.js';

export default function Scenario() {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState([{id: 'Beige', color: '#F5F5DC'}]);
  return (
    <div>
      <button id="clear" onClick={() => setInputValue('')}>
        clear input value
      </button>
      <button id="hello-world" onClick={() => setInputValue('hello world')}>
        set input value to 'hello world'
      </button>
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
        onChange={({value}) => setValue(value)}
        value={value}
        onInputValueChange={value => setInputValue(value)}
        inputValue={inputValue}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onSelectResetsInput={false}
      />
    </div>
  );
}
