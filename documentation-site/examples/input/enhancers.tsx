import * as React from 'react';
import {useStyletron} from 'baseui';
import {Search} from 'baseui/icon';
import {StatefulInput} from 'baseui/input';

export default () => {
  const [useCss, theme] = useStyletron();
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
          <div
            className={useCss({
              color: $isFocused
                ? theme.colors.primary
                : theme.colors.mono700,
            })}
          >
            @
          </div>
        )}
        endEnhancer={({$isFocused}) => (
          <div
            className={useCss({
              color: $isFocused
                ? theme.colors.primary
                : theme.colors.mono700,
            })}
          >
            .com
          </div>
        )}
        placeholder="Input with function enhancers."
      />
    </div>
  );
};
