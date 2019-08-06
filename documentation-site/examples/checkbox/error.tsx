import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';

export default () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
      isError
    >
      Checkbox with an error
    </Checkbox>
  );
};
