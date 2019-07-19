import * as React from 'react';
import {Block} from 'baseui/block';
import * as Icons from 'baseui/icon/icon-exports';

function makeImportStatement(key: string) {
  const path = key
    .split(/(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');

  return `import ${key} from 'baseui/icon/${path}'`;
}

export default () => (
  <Block>
    {Object.entries(Icons).map(
      ([key, Icon]: [string, React.Node]) => (
        <Block
          key={key}
          alignItems="center"
          color="foreground"
          display="flex"
          paddingBottom="scale500"
        >
          <Icon size={24} />
          <Block font="foregroundAlt" marginLeft="scale200">
            {key}
          </Block>
          <Block color="foregroundAlt" marginLeft="scale200">
            {makeImportStatement(key)}
          </Block>
        </Block>
      ),
    )}
  </Block>
);
