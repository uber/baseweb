import * as React from 'react';
import {Button, SIZE} from 'baseui/button';
import {Checkbox} from 'baseui/checkbox';

export default function Example() {
  const [checked, setChecked] = React.useState(true);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <React.Fragment>
      <Button
        size={SIZE.compact}
        onClick={() => {
          if (inputRef.current === null) return;
          if (focused) {
            inputRef.current.blur();
            setFocused(false);
          } else {
            inputRef.current.focus();
            setFocused(true);
          }
        }}
      >
        Click to focus checkbox
      </Button>
      <Checkbox
        inputRef={inputRef}
        checked={checked}
        onChange={() => setChecked(!checked)}
      >
        Focused checkbox
      </Checkbox>
    </React.Fragment>
  );
}
