// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulPopover, TRIGGER_TYPE} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <StatefulPopover
      content={
        <Paragraph1 padding="scale500">hello world</Paragraph1>
      }
      accessibilityType={'tooltip'}
      triggerType={TRIGGER_TYPE.hover}
    >
      <span className={useCss({...theme.typography.font400})}>
        Hover
      </span>
    </StatefulPopover>
  );
};
