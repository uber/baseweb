import React from 'react';
import {Block} from 'baseui/block';

export default () => {
  const elements = [];

  for (let x = 0; x < 4; x++) {
    elements.push(
      <Block
        key={x}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="200px"
        height="200px"
        margin="scale200"
        font="font400"
        color="primary"
        $style={{border: 'grey solid 2px'}}
      >
        Positioned with flexbox
      </Block>,
    );
  }

  return (
    <Block
      display="flex"
      direction="column"
      padding="scale3200"
      $style={{border: 'grey solid 4px'}}
      flexWrap
    >
      {elements}
    </Block>
  );
};
