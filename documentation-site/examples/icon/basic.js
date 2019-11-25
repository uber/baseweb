// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import ArrowUp from 'baseui/icon/arrow-up';
import ArrowRight from 'baseui/icon/arrow-right';
import ArrowDown from 'baseui/icon/arrow-down';
import ArrowLeft from 'baseui/icon/arrow-left';

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
