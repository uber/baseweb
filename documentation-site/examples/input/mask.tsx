import * as React from 'react';
import {MaskedInput} from 'baseui/input';

export default function Example() {
  return (
    <MaskedInput placeholder="Phone number" mask="(999) 999-9999" />
  );
}
