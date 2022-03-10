// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Select, Value, ControlRef} from 'baseui/select';
import {Button} from 'baseui/button';

export default function Example() {
  const [css] = useStyletron();
  const [value, setValue] = React.useState<Value>([]);
  const controlRef = React.useRef<ControlRef>(null);
  return (
    <div>
      <div
        className={css({
          marginBottom: '20px',
        })}
      >
        <Button
          onClick={(e) =>
            controlRef.current &&
            controlRef.current.setInputValue('orange')
          }
          id="setInputValue"
        >
          Set value to "orange"
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
