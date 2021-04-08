// @flow

import * as React from 'react';

import {useStyletron} from 'baseui';
import {Combobox} from 'baseui/combobox';
import {FormControl} from 'baseui/form-control';
import {Button} from 'baseui/button';

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
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef(null);
  return (
    <div className={css({display: 'flex', flexDirection: 'row'})}>
      <span>
        <FormControl label="Color">
          <Combobox
            value={value}
            onChange={setValue}
            mapOptionToString={o => o.label}
            options={options}
            inputRef={inputRef}
            overrides={{
              Root: {
                style: {
                  width: '375px',
                  marginRight: theme.sizing.scale600,
                },
              },
            }}
          />
        </FormControl>
      </span>
      <Button
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
      >
        Click to focus
      </Button>
    </div>
  );
}

export default Example;
