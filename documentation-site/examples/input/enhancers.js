// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Search} from 'baseui/icon';
import {StatefulInput} from 'baseui/input';

export default () => {
  return (
    <div>
      <StatefulInput
        startEnhancer="@"
        placeholder="Input with a start enhancer"
      />
      <br />

      <StatefulInput
        endEnhancer=".00"
        placeholder="Input with an end enhancer"
      />
      <br />

      <StatefulInput
        startEnhancer="$"
        endEnhancer=".00"
        placeholder="Input with start and end enhancers"
      />
      <br />

      <StatefulInput
        endEnhancer={<Search size="18px" />}
        placeholder="Input with an icon enhancer"
      />
      <br />

      <StatefulInput
        startEnhancer={({$isFocused}) => (
          <Block color={$isFocused ? 'negative' : 'mono700'}>
            @
          </Block>
        )}
        endEnhancer={({$isFocused}) => (
          <Block color={$isFocused ? 'negative' : 'mono700'}>
            .com
          </Block>
        )}
        placeholder="Input with function enhancers."
      />
    </div>
  );
};
