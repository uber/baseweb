// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Select} from 'baseui/select';
import {Button} from 'baseui/button';

export default function Example() {
  const [css] = useStyletron();
  const [value, setValue] = React.useState([]);
  const controlRef = React.useRef(null);
  return (
    <div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        })}
      >
        <Button
          onClick={() => {
            controlRef.current &&
              controlRef.current.setDropdownOpen(true);
          }}
          id={'open'}
        >
          Open Dropdown
        </Button>
        <Button
          onClick={() => {
            controlRef.current &&
              controlRef.current.setDropdownOpen(false);
          }}
          id={'close'}
        >
          Close Dropdown
        </Button>
      </div>

      <Select
        controlRef={controlRef}
        options={[
          {id: 'a', label: 'apple'},
          {id: 'b', label: 'banana'},
          {id: 'c', label: 'orange'},
        ]}
        value={value}
        onChange={({value}) => setValue(value)}
        overrides={{
          ValueContainer: {props: {'data-id': 'selected'}},
        }}
      />
    </div>
  );
}
