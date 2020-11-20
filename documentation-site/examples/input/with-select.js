// @flow

import * as React from 'react';

import {useStyletron} from 'baseui';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Select} from 'baseui/select';

function SelectAtStart(props) {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex'})}>
      <div className={css({width: '200px', paddingRight: '8px'})}>
        <Select
          options={props.options}
          labelKey="id"
          valueKey="color"
          onChange={({value}) => props.onSelectChange(value)}
          value={props.selectValue}
          id={props.id}
        />
      </div>
      <Input
        onChange={e => props.onInputChange(e.target.value)}
        value={props.inputValue}
      />
    </div>
  );
}

function SelectAtEnd(props) {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex'})}>
      <Input
        onChange={e => props.onInputChange(e.target.value)}
        value={props.inputValue}
        id={props.id}
      />
      <div className={css({width: '200px', paddingLeft: '8px'})}>
        <Select
          options={props.options}
          labelKey="id"
          valueKey="color"
          onChange={({value}) => props.onSelectChange(value)}
          value={props.selectValue}
        />
      </div>
    </div>
  );
}

export default function Scenario() {
  const [startInputValue, setStartInputValue] = React.useState('');
  const [startSelectValue, setStartSelectValue] = React.useState(
    [],
  );
  const [endInputValue, setEndInputValue] = React.useState('');
  const [endSelectValue, setEndSelectValue] = React.useState([]);

  return (
    <div>
      <FormControl
        label="input with start select"
        caption="caption"
      >
        <SelectAtStart
          inputValue={startInputValue}
          onInputChange={v => setStartInputValue(v)}
          selectValue={startSelectValue}
          onSelectChange={v => setStartSelectValue(v)}
          options={[
            {id: 'AliceBlue', color: '#F0F8FF'},
            {id: 'AntiqueWhite', color: '#FAEBD7'},
            {id: 'Aqua', color: '#00FFFF'},
          ]}
          id="start-id"
        />
      </FormControl>

      <FormControl label="input with end select" caption="caption">
        <SelectAtEnd
          inputValue={endInputValue}
          onInputChange={v => setEndInputValue(v)}
          selectValue={endSelectValue}
          onSelectChange={v => setEndSelectValue(v)}
          options={[
            {id: 'AliceBlue', color: '#F0F8FF'},
            {id: 'AntiqueWhite', color: '#FAEBD7'},
            {id: 'Aqua', color: '#00FFFF'},
          ]}
          id="end-id"
        />
      </FormControl>
    </div>
  );
}
