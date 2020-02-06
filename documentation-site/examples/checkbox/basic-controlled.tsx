import * as React from 'react';
import {Checkbox} from 'spaceweb/checkbox';

export default () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
    >
      click me
    </Checkbox>
  );
};
