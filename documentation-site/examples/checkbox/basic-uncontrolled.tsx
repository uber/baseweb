import * as React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default function Example() {
  return (
    <StatefulCheckbox onChange={console.log}>
      click me
    </StatefulCheckbox>
  );
}
