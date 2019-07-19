import * as React from 'react';
import {Block} from 'baseui/block';

export default () => {
  const colors = ['primary', 'negative', 'warning', 'positive'];
  const elements = [];

  for (const color of colors) {
    for (let x = 100; x <= 700; x += 100) {
      const colorString = `${color}${x}`;
      elements.push(
        <Block color={colorString} key={colorString}>
          {colorString}
        </Block>,
      );
    }
  }

  return elements;
};
