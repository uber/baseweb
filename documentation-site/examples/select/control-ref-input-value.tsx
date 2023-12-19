import * as React from 'react';
import {useStyletron} from 'baseui';
import {Select, Value, ImperativeMethods} from 'baseui/select';
import {Button} from 'baseui/button';

export default function Example() {
  const [css] = useStyletron();
  const [value, setValue] = React.useState<Value>([]);
  const controlRef = React.useRef<ImperativeMethods>(null);
  return (
    <div>
      <div
        className={css({
          marginBottom: '20px',
        })}
      >
        <Button
          onClick={() =>
            controlRef.current &&
            controlRef.current.setInputValue('orange')
          }
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
