import * as React from 'react';
import {Textarea} from 'spaceweb/textarea';
import {Button} from 'spaceweb/button';

export default () => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  return (
    <React.Fragment>
      <Textarea
        inputRef={inputRef}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder="Focus me by clicking the button below..."
      />
      <br />
      <Button
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
      >
        Focus Textarea
      </Button>
    </React.Fragment>
  );
};
