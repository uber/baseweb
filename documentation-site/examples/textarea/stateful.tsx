import * as React from 'react';
import {StatefulTextarea} from 'spaceweb/textarea';

export default () => {
  return (
    <StatefulTextarea
      initialState={{value: 'I manage my own state...'}}
      onChange={console.log}
      placeholder="I manage my own state..."
    />
  );
};
