import React from 'react';
import {styled} from 'baseui';
import {Block} from 'baseui/block';

export default () => {
  const Inner = styled('div', ({$theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $theme.colors.mono300,
    border: `1px solid ${$theme.colors.mono900}`,
    height: '50px',
    width: '50px',
  }));
  return (
    <Block
      display="grid"
      gridTemplateColumns="repeat(3,1fr)"
      justifyItems="center"
      gridGap="scale1000"
    >
      <Inner>1</Inner>
      <Inner>2</Inner>
      <Inner>3</Inner>
      <Inner>4</Inner>
      <Inner>5</Inner>
      <Inner>6</Inner>
    </Block>
  );
};
