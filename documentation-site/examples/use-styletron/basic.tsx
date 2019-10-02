import React from 'react';
import {useStyletron} from 'baseui';

function UseStyletronExample() {
  const [useCss, theme] = useStyletron();
  return (
    <div className={useCss({color: theme.colors.accent})}>
      This is a blue div
    </div>
  );
}

export default UseStyletronExample;
