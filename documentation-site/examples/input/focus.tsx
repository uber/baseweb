import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {Input} from 'baseui/input';

export default () => {
  const [css, theme] = useStyletron();
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <div className={css({display: 'flex'})}>
      <div
        className={css({
          width: '50%',
          marginRight: theme.sizing.scale400,
        })}
      >
        <Input inputRef={inputRef} placeholder="With input ref" />
      </div>
      <Button
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        Click to focus
      </Button>
    </div>
  );
};
