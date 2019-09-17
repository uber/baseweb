import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulPopover, TRIGGER_TYPE} from 'baseui/popover';
import {Paragraph3} from 'baseui/typography';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <StatefulPopover
      content={
        <Paragraph3 padding="scale500">hello world</Paragraph3>
      }
      accessibilityType={'tooltip'}
      triggerType={TRIGGER_TYPE.hover}
    >
      <span className={css({...theme.typography.font300})}>
        Hover
      </span>
    </StatefulPopover>
  );
};
