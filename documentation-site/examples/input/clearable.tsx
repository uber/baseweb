import * as React from 'react';
import {StatefulInput} from 'baseui/input';

export default () => {
  const inputRef = React.useRef(null);
  return (
    <StatefulInput
      initialState={{value: 'Clear me!'}}
      inputRef={inputRef}
      clearable
    />
  );
};
