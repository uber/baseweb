import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulInput} from 'baseui/input';

export default () => {
  const inputRef = React.createRef();
  return (
    <Block display="flex">
      <Block width="50%" marginRight="scale400">
        <StatefulInput inputRef={inputRef} placeholder="With input ref" />
      </Block>
      <Button onClick={() => inputRef.current && inputRef.current.focus()}>
        Click to focus
      </Button>
    </Block>
  );
};
