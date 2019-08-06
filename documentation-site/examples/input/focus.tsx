import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {Input} from 'baseui/input';

export default () => {
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <Block display="flex">
      <Block width="50%" marginRight="scale400">
        <Input inputRef={inputRef} placeholder="With input ref" />
      </Block>
      <Button
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        Click to focus
      </Button>
    </Block>
  );
};
