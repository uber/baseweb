import React from 'react';
import {useStyletron} from 'baseui';
import {colors} from 'spaceweb/tokens';

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({color: colors.blue400})}>
      This text is Uber blue!
    </div>
  );
};
