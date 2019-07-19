import * as React from 'react';

import {StatefulInput} from 'baseui/input';
import {styled} from 'baseui';

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default function() {
  return (
    <Centered>
      <StatefulInput />
    </Centered>
  );
}
