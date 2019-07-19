import * as React from 'react';
import {Block} from 'baseui/block';
import ArrowUp from 'baseui/icon/arrow-up';
import ArrowRight from 'baseui/icon/arrow-right';
import ArrowDown from 'baseui/icon/arrow-down';
import ArrowLeft from 'baseui/icon/arrow-left';

export default () => (
  <Block color="warning">
    <ArrowUp size={36} />
    <ArrowUp size={36} />
    <ArrowDown size={36} />
    <ArrowDown size={36} />
    <ArrowLeft size={36} />
    <ArrowRight size={36} />
    <ArrowLeft size={36} />
    <ArrowRight size={36} />
  </Block>
);
