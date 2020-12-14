// @flow
import * as React from 'react';
import {Textarea} from 'baseui/textarea';

export default function Example() {
  const [value, setValue] = React.useState('');
  return (
    <Textarea
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      placeholder="Try resizing me..."
      overrides={{
        Input: {
          style: {
            maxHeight: '300px',
            minHeight: '100px',
            minWidth: '300px',
            width: '100vw', // fill all available space up to parent max-width
            resize: 'both',
          },
        },
        InputContainer: {
          style: {
            maxWidth: '100%',
            width: 'min-content',
          },
        },
      }}
    />
  );
}
