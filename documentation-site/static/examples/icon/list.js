import React from 'react';
import {Block} from 'baseui/block';
import * as Icons from 'baseui/icon/icon-exports';

function makeImportStatement(key) {
  const path = key
    .split(/(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');

  return `import ${key} from 'baseui/icon/${path}'`;
}

export default () => (
  <Block>
    {Object.entries(Icons).map(([key, Icon]) => (
      <Block
        key={key}
        alignItems="center"
        color="mono1000"
        display="flex"
        paddingBottom="scale500"
      >
        <Icon size={24} />
        <Block font="font350" marginLeft="scale200">
          {key}
        </Block>
        <Block color="mono700" marginLeft="scale200">
          {makeImportStatement(key)}
        </Block>
      </Block>
    ))}
  </Block>
);
