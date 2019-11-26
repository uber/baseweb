// @flow
import React from 'react';
import {useStyletron} from 'baseui';

function UseStyletronExample() {
  const [css, theme] = useStyletron();
  return (
    <div className={css({color: theme.colors.accent})}>
      This is a blue div
    </div>
  );
}

export default UseStyletronExample;
