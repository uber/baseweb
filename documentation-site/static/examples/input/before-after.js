import React from 'react';
import {Block} from 'baseui/block';
import {Search} from 'baseui/icon';
import {StatefulInput} from 'baseui/input';

export default () => (
  <Block>
    <StatefulInput
      overrides={{
        Before: () => (
          <Block display="flex" alignItems="center" paddingLeft="scale500">
            <Search size="16px" />
          </Block>
        ),
      }}
      placeholder="Input with a Before component"
    />
    <Block as="br" />

    <StatefulInput
      overrides={{
        After: () => (
          <Block display="flex" alignItems="center" paddingRight="scale500">
            <Search size="16px" />
          </Block>
        ),
      }}
      placeholder="Input with an After component"
    />
  </Block>
);
