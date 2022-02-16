// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulPopover, TRIGGER_TYPE} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <StatefulPopover
      content={
        <ParagraphSmall padding="scale500">
          hello world
        </ParagraphSmall>
      }
      accessibilityType={'tooltip'}
      triggerType={TRIGGER_TYPE.hover}
    >
      <span className={css({...theme.typography.font300})}>
        Hover
      </span>
    </StatefulPopover>
  );
}
