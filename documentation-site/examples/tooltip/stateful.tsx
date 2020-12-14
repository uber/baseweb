import * as React from 'react';
import {StatefulTooltip} from 'baseui/tooltip';
import {useStyletron} from 'baseui';

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <div>
      You can use tooltips in many places, including inline text{' '}
      <StatefulTooltip
        accessibilityType={'tooltip'}
        content="Tooltips display short messages."
      >
        <span
          className={css({
            borderBottomWidth: '1px',
            borderBottomStyle: 'dotted',
            borderBottomColor: `${theme.colors.primary500}`,
            color: theme.colors.primary500,
          })}
          tabIndex={0}
        >
          such as this
        </span>
      </StatefulTooltip>
      . Tooltips are essentially just a Popover with a few style
      tweaks, so you can use all the features that Popover supports.
    </div>
  );
}
