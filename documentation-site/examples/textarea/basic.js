// @flow
import * as React from 'react';
import {Textarea} from 'baseui/textarea';

export default function() {
  const [value, setValue] = React.useState('');
  return (
    <Textarea
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      placeholder="Enter some text here..."
    />
  );
}
