import * as React from 'react';
import {useStyletron} from 'baseui';

export default function() {
  const [css, theme] = useStyletron();
  return (
    <div className={css({color: theme.colors.primary})}>
      This is a blue div
    </div>
  );
}
