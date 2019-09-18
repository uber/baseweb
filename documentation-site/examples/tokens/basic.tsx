import React from 'react';
import {useStyletron} from 'baseui';
import {colors} from 'baseui/tokens';

export default () => {
  const [useCss] = useStyletron();
  return (
    <div className={useCss({color: colors.blue400})}>
      This text is Uber blue!
    </div>
  );
};
