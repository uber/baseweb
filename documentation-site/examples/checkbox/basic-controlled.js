// @flow
import React, {useState} from 'react';
import {Checkbox} from 'baseui/checkbox';

const App = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
    >
      click me
    </Checkbox>
  );
};

export default App;
