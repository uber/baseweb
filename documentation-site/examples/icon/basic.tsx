import * as React from 'react';
import {useStyletron} from 'baseui';
import {
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
} from 'baseui/icon';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <div className={css({color: theme.colors.warning})}>
      <ArrowUp size={36} />
      <ArrowUp size={36} />
      <ArrowDown size={36} />
      <ArrowDown size={36} />
      <ArrowLeft size={36} />
      <ArrowRight size={36} />
      <ArrowLeft size={36} />
      <ArrowRight size={36} />
    </div>
  );
};
