import * as React from 'react';
import {Block} from 'baseui/block';

export default () => {
  const sizes = [
    100,
    200,
    250,
    300,
    350,
    400,
    450,
    500,
    600,
    700,
    800,
    900,
    1000,
  ];

  return sizes.map(size => {
    const fontString = `font${size}`;

    return (
      <Block key={size} font={fontString}>
        {fontString}
      </Block>
    );
  });
};
