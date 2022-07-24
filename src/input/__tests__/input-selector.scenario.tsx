/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FormControl } from '../../form-control';
import { Select } from '../../select';
import { useStyletron } from '../../styles';

import { Input } from '..';

function SelectAtStart(props) {
  const [css] = useStyletron();
  return (
    <div className={css({ display: 'flex' })}>
      <div className={css({ width: '200px', paddingRight: '8px' })}>
        <Select
          options={props.options}
          labelKey="id"
          valueKey="color"
          onChange={({ value }) => props.onSelectChange(value)}
          value={props.selectValue}
          id={props.id}
        />
      </div>
      <Input onChange={(e) => props.onInputChange(e.target.value)} value={props.inputValue} />
    </div>
  );
}

function SelectAtEnd(props) {
  const [css] = useStyletron();
  return (
    <div className={css({ display: 'flex' })}>
      <Input
        onChange={(e) => props.onInputChange(e.target.value)}
        value={props.inputValue}
        id={props.id}
      />

      <div className={css({ width: '200px', paddingLeft: '8px' })}>
        <Select
          options={props.options}
          labelKey="id"
          valueKey="color"
          onChange={({ value }) => props.onSelectChange(value)}
          value={props.selectValue}
        />
      </div>
    </div>
  );
}

export function Scenario() {
  const [css] = useStyletron();
  const [startInputValue, setStartInputValue] = React.useState('');
  const [startSelectValue, setStartSelectValue] = React.useState([]);
  const [endInputValue, setEndInputValue] = React.useState('');
  const [endSelectValue, setEndSelectValue] = React.useState([]);

  return (
    <div className={css({ padding: '24px', width: '500px' })}>
      <FormControl label="input with start select" caption="caption">
        <SelectAtStart
          inputValue={startInputValue}
          onInputChange={(v) => setStartInputValue(v)}
          selectValue={startSelectValue}
          onSelectChange={(v) => setStartSelectValue(v)}
          options={[
            { id: 'AliceBlue', color: '#F0F8FF' },
            { id: 'AntiqueWhite', color: '#FAEBD7' },
            { id: 'Aqua', color: '#00FFFF' },
          ]}
          id="start-id"
        />
      </FormControl>

      <FormControl label="input with end select" caption="caption">
        <SelectAtEnd
          inputValue={endInputValue}
          onInputChange={(v) => setEndInputValue(v)}
          selectValue={endSelectValue}
          onSelectChange={(v) => setEndSelectValue(v)}
          options={[
            { id: 'AliceBlue', color: '#F0F8FF' },
            { id: 'AntiqueWhite', color: '#FAEBD7' },
            { id: 'Aqua', color: '#00FFFF' },
          ]}
          id="end-id"
        />
      </FormControl>
    </div>
  );
}
