import * as React from 'react';
import {StatefulTextarea as Textarea} from 'baseui/textarea';
import {Button} from 'baseui/button';

export default () => {
  const inputRef = React.createRef();
  return (
    <React.Fragment>
      <Textarea inputRef={inputRef} placeholder="With textarea input ref" />
      <br />
      <Button
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
      >
        Click here to focus input
      </Button>
    </React.Fragment>
  );
};
